import React, { useState, useEffect } from 'react';
import {
	Card,
	CardContent,
	Typography,
	makeStyles,
	TextField,
	Grid,
	Button,
	Box,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import {get} from 'lodash'
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import AddIcCallIcon from '@material-ui/icons/AddIcCall';
import moment from 'moment';
import clsx from 'clsx';
import { Device } from 'twilio-client';
import CallEndIcon from '@material-ui/icons/CallEnd';
import * as actionTypes from 'src/actionTypes';
import axios from 'axios';
import { setOngoingCall, storeOutgoingCallDetails,addLeadComment } from 'src/actions/leadActions';
import AddEditEventModal from 'src/views/calendar/CalendarView/AddEditEventModal';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(2)
	},
	callIcon: {
		marginTop: theme.spacing(1),
		marginLeft: theme.spacing(2)
	},
	callCard: {
		marginTop: theme.spacing(3),
		dislay: 'flex',
		flexDirection: 'row',
		justifyContent: 'center'
	},
	cardFooter: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: theme.spacing(2)
	},
	btn: {
		marginTop: theme.spacing(1),
		marginLeft: theme.spacing(2)
	},
	textArea: {
		width: '100%'
	}
}));

function CallDetail({ phoneNumber, leadEmail, leadName,leadId, companyName,submitComments, ...rest }) {
	const classes = useStyles();
	let [ device, setDevice ] = useState(null);
	let [ connection, setConnection ] = useState(null);
	const [ muteStatus, setMuteStatus ] = useState(false);

	const [ second, setSecond ] = useState(0);
	const [ isTimerStart, setTimerStatus ] = useState(false);
	const [ modal, setModal ] = useState({
		event: null,
		mode: null,
		open: false
	});
	const [ commentsModal, setCommentsModal ] = useState(false);
	const [ comments, setComments ] = useState('');

	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();

	const user = useSelector((state) => state.account.user);

	let userInfo = {};
	if (user && Object.keys(user).length > 0) {
		userInfo = get(user, 'data', {});
	}
	if (device) {
		device.on('disconnect', async function(connection) {
			setTimerStatus(false);
			const data = {
				phoneNumber: '',
				isOngoingCall: false
			};
			await dispatch(setOngoingCall(data));

			const callDetails = {
				callSid: connection.parameters.CallSid,
				agentEmail: user.data && user.data.email ? user.data.email : '',
				leadEmail: leadEmail,
				leadStatus: 'pending'
			};
			await dispatch(storeOutgoingCallDetails(callDetails));
		});
	}
	useEffect(
		() => {
			let interval;

			if (isTimerStart) {
				interval = setInterval(() => {
					setSecond((second) => {
						return second + 1;
					});
				}, 1000);
			}
			return () => {
				clearInterval(interval);
			};
		},
		[ isTimerStart ]
	);
	useEffect(() => {
		getTwilioToken();
	}, []);

	const callLeadHandler = async () => {
		setTimerStatus(true);

		const data = {
			phoneNumber: phoneNumber,
			isOngoingCall: true
		};
		await dispatch(setOngoingCall(data));

		const params = { phoneNumber: phoneNumber };
		connection = device.connect(params);
		setConnection(connection);
	};
	const resetModal = () => {
		setModal({
			event: null,
			mode: null,
			open: false
		});
	};
	const hangUpCallHandler = async () => {
		setTimerStatus(false);

		device.disconnectAll();
		const data = {
			phoneNumber: '',
			isOngoingCall: false
		};
		await dispatch(setOngoingCall(data));
	};
	const toggleMuteChanage = async () => {
		const status = !muteStatus;
		setMuteStatus(status);
		connection.mute(status);
	};

	const getTwilioToken = async () => {
		await axios
			.get(`${actionTypes.API_URL}/agent/get-token`)
			.then((res) => {
				const token = res.data.token;
				device = new Device();
				device.setup(token);
				setDevice(device);
			})
			.catch((error) => {
				enqueueSnackbar('Unable to connect', {
					variant: 'error'
				});
			});
	};
	const submitCommentsHandler=async()=>{
		const data={
			comments:comments,
			role:userInfo.role,
			leadId:leadId
		}
		try{
			await addLeadComment(data)
			enqueueSnackbar('Comments Submitted Successfully!', {
				variant: 'success'
			});
			setCommentsModal(false)
			setComments("");
			submitComments()
		}
		catch(error){
			const err=error ? error : 'Unable to submit Lead comments!Please try again'
			enqueueSnackbar(err, {
				variant: 'error'
			});
		}
	}
	const addToCalendarHandler = () => {
		setModal({
			event: {
				allDay: false,
				description: companyName ? `email:${leadEmail} Company Name : ${companyName} ` : `email:${leadEmail}`,
				end: moment().add(30, 'minutes').toDate(),
				start: moment().toDate(),
				title: `Call with ${leadName}`
			},
			mode: 'add',
			open: true
		});
	};
	const addCommentsHandler = () => {
		setCommentsModal(true);
	};
	const handleComments = (e) => {
		setComments(e.target.value);
	};

	const modifyNum = (num) => {
		return ('0' + num).slice(-2);
	};

	const getCounterHandler = () => {
		let minutes = Math.floor(second / 60);
		let secs = second % 60;
		let hours = Math.floor(minutes / 60);
		minutes = minutes % 60;
		return `${modifyNum(hours)}:${modifyNum(minutes)}:${modifyNum(secs)}`;
	};

	const getCounter = getCounterHandler();

	return (
		<React.Fragment>
			<Card className={classes.root}>
				<CardContent>
					<Typography gutterBottom variant="h4" color="textPrimary" align="center">
						Call Details
					</Typography>
					<Grid container>
						<Grid item xs={10}>
							<TextField fullWidth value={phoneNumber} variant="outlined" />
						</Grid>
						<Grid item xs={2}>
							<Button
								color="primary"
								size="small"
								type="submit"
								variant="contained"
								className={classes.callIcon}
								onClick={callLeadHandler}
							>
								<AddIcCallIcon />
							</Button>
						</Grid>
					</Grid>
					<Card className={classes.callCard}>
						<CardContent>
							<Typography variant="h3" gutterBottom color="textPrimary" align="center">
								Calling {phoneNumber}
							</Typography>
							<Typography variant="h4" gutterBottom color="textPrimary" align="center">
								{getCounter}
							</Typography>
							<Box display="flex" flexDirection="row" justifyContent="center">
								<Button
									color=""
									size="small"
									type="submit"
									variant="contained"
									className={classes.callIcon}
									onClick={hangUpCallHandler}
								>
									<CallEndIcon />
								</Button>
								{isTimerStart && (
									<Button
										color="primary"
										size="small"
										type="submit"
										variant="contained"
										className={classes.callIcon}
										onClick={toggleMuteChanage}
									>
										{!muteStatus ? 'Mute' : 'Unmute'}
									</Button>
								)}
							</Box>
						</CardContent>
					</Card>
				</CardContent>
				<Box className={classes.cardFooter}>
					<Button
						color="primary"
						size="small"
						type="submit"
						variant="contained"
						className={classes.callIcon}
						onClick={addToCalendarHandler}
					>
						Add To Calendar
					</Button>
					<Button
						size="small"
						type="submit"
						className={clsx('btn-secondary', classes.btn)}
						onClick={addCommentsHandler}
					>
						Add Comments
					</Button>
					<Button
						color="primary"
						size="medium"
						type="submit"
						variant="outlined"
						className={classes.callIcon}
						onClick=""
					>
						Send Email
					</Button>
				</Box>
			</Card>
			<AddEditEventModal
				event={modal.event}
				mode={modal.mode}
				onCancel={resetModal}
				open={modal.open}
				addEventSuccess={resetModal}
			/>
			<Dialog
				onClose={() => {
					setCommentsModal(false);
				}}
				open={commentsModal}
				maxWidth="sm"
				fullWidth={true}
			>
				<DialogTitle>Add Comments</DialogTitle>
				<DialogContent>
					<TextField
						label="Comments"
						multiline
						rows={4}
						defaultValue=""
						variant="outlined"
						onChange={handleComments}
						value={comments}
						className={classes.textArea}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							setCommentsModal(false);
						}}
						color="primary"
					>
						Cancel
					</Button>
					<Button
						color="primary"
						size="small"
						type="submit"
						variant="contained"
						onClick={submitCommentsHandler}
					>
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}
CallDetail.propTypes = {
	phoneNumber: PropTypes.string.isRequired,
	submitComment:PropTypes.func.isRequired
};

export default CallDetail;
