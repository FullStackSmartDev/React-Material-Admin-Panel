import React, { useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Box,
	makeStyles,
	Card,
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	Grid,
	Button,
	DialogActions,
	TablePagination
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import {get} from 'lodash'
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import {updateCallStatus} from 'src/actions/leadActions'

const useStyles = makeStyles((theme) => ({
	root: {},
	noRecords: {
		textAlign: 'right',
		margin: 20
	},
	status: {
		marginBottom: theme.spacing(2)
	},
	textArea: {
		width: '100%'
	}
}));
function LeadsListView({ callList,updateStatus, ...rest }) {
	const [ dialog, setDialog ] = useState(false);
	const [ remarks, setRemarks ] = useState('');
	const [ status, setStatus ] = useState('pending');
	const [callSid,setCallSid]=useState("")

	const classes = useStyles();
	const { enqueueSnackbar } = useSnackbar();

	const user = useSelector((state) => state.account.user);

	let userInfo = {};
	if (user && Object.keys(user).length > 0) {
		userInfo = get(user, 'data', {});
	}
	const dispatch=useDispatch();

	const handleRemarks = (e) => {
		setRemarks(e.target.value);
	};
	const handleStatus = (e) => {
		setStatus(e.target.value);
	};
	const handleStatusSubmit=async ()=>{
		const data={
			role:userInfo.role,
			callSid:callSid,
			leadStatus:status,
			remarks:remarks
		}
		try{
			await dispatch(updateCallStatus(data))
			setDialog(false)
			setRemarks("")
			updateStatus();
		}
		catch(error){
			enqueueSnackbar(error, {
				variant: 'error'
			});
		}
	}
	return (
		<Card {...rest}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>Email</TableCell>
						<TableCell>Call Date</TableCell>
						<TableCell>Duration(in sec)</TableCell>
						<TableCell>Call Status</TableCell>
						<TableCell>Lead Status</TableCell>
						<TableCell>Remarks</TableCell>
						<TableCell>Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{callList && callList.length > 0 ? (
						callList.map((call, index) => {
							return (
								<TableRow hover key={index + 1}>
									<TableCell>{call.name}</TableCell>
									<TableCell>{call.email}</TableCell>
									<TableCell>{moment(call.startDate).format('DD -MM-YYYY hh:mm:ss A')}</TableCell>
									<TableCell>{call.duration}</TableCell>
									<TableCell>{call.callStatus}</TableCell>
									<TableCell>{call.leadStatus}</TableCell>
									<TableCell>{call.remarks ? call.remarks  :'NA'}</TableCell>

									<TableCell>
										<Button
											color="primary"
											size="small"
											type="submit"
											variant="contained"
											className={classes.callIcon}
											onClick={() => {setDialog(true);setCallSid(call.callSid)}}
										>
											Update Status
										</Button>
									</TableCell>
								</TableRow>
							);
						})
					) : (
						<h3 className={classes.noRecords}>No Records Found!</h3>
					)}
				</TableBody>
			</Table>
			<TablePagination
				component="div"
				count={callList ? callList.length : 0}
				// onChangePage={handlePageChange}
				// onChangeRowsPerPage={handleLimitChange}
				// page={page}
				// rowsPerPage={limit}
				rowsPerPageOptions={[ 5, 10, 25 ]}
			/>
			<Dialog
				onClose={() => {
					setDialog(false);
				}}
				aria-labelledby="status-dialog"
				open={dialog}
				maxWidth="sm"
				fullWidth={true}
			>
				<DialogTitle id="status-dialog">
					<Box fontWeight="fontWeightBold" fontSize={20}>
						Update Lead Status
					</Box>
				</DialogTitle>
				<DialogContent>
					<Grid container className={classes.status}>
						<Grid item md={3} xs={12}>
							Final Status :
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label="Select Status"
								name="status"
								select
								SelectProps={{ native: true }}
								onChange={handleStatus}
								value={status}
								variant="outlined"
							>
								{[ 'pending', 'approved', 'rejected' ].map((status) => (
									<option key={status} value={status}>
										{status}
									</option>
								))}
							</TextField>
						</Grid>
					</Grid>
					<Grid container>
						<Grid item md={3} xs={12}>
							Remarks :
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								label="Remarks"
								multiline
								rows={3}
								defaultValue=""
								variant="outlined"
								onChange={handleRemarks}
								value={remarks}
								className={classes.textArea}
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button
						color="primary"
						onClick={handleStatusSubmit}
					>
						Submit
					</Button>
					<Button
						onClick={() => {
							setDialog(false);
						}}
						color=""
					>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</Card>
	);
}
export default LeadsListView;
