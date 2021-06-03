/* eslint-disable max-len */
import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
	Box,
	Button,
	Card,
	InputAdornment,
	SvgIcon,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	TextField,
	Typography,
	Link,
	makeStyles,
	Chip,
	Dialog,
	DialogActions,
	DialogTitle,
	Grid,
	DialogContent
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { useSelector, useDispatch } from 'react-redux';
import AddIcCallIcon from '@material-ui/icons/AddIcCall';
import CallEndIcon from '@material-ui/icons/CallEnd';

const useStyles = makeStyles((theme) => ({
	root: {},
	queryField: {
		width: 500
	},
	bulkOperations: {
		position: 'relative'
	},
	bulkActions: {
		paddingLeft: 4,
		paddingRight: 4,
		marginTop: 6,
		position: 'absolute',
		width: '100%',
		zIndex: 2,
		backgroundColor: theme.palette.background.default
	},
	bulkAction: {
		marginLeft: theme.spacing(2)
	},
	avatar: {
		height: 42,
		width: 42,
		marginRight: theme.spacing(1)
	},
	approveBtn: {
		marginRight: theme.spacing(1)
	},
	headingText: {
		marginBottom: theme.spacing(2)
	},
	noRecords: {
		textAlign: 'right',
		margin: 20
	},
	callIcon: {
		marginTop: theme.spacing(1)
	}
}));

function Results({ className, leadList, userRole, searchQuery, callLead, hangUpCall, ...rest }) {
	const classes = useStyles();
	const [ page, setPage ] = useState(0);
	const [ limit, setLimit ] = useState(10);
	const [ query, setQuery ] = useState('');
	const [ isDialogOpen, setDialog ] = useState(false);
	const [ selectedRecord, setSelectedRecord ] = useState({});

	const isOngoingCall = useSelector((state) => state.leads.isOngoingCall);
	const selectedPhoneNumber = useSelector((state) => state.leads.selectedPhoneNumber);

	const handlePageChange = (event, newPage) => {
		setPage(newPage);
	};

	const handleLimitChange = (event) => {
		setLimit(event.target.value);
	};
	const handleQueryChange = (event) => {
		const value = event.target.value;
		setQuery(value);
		searchQuery(value);
	};
	const viewDetailsHandler = (record) => {
		setDialog(true);
		setSelectedRecord(record);
	};
	const callLeadHandler = (record) => {
		callLead(record);
	};

	return (
		<Card className={clsx(classes.root, className)} {...rest}>
			<Box p={2} minHeight={56} display="flex" alignItems="center">
				<TextField
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SvgIcon fontSize="small" color="action">
									<SearchIcon />
								</SvgIcon>
							</InputAdornment>
						)
					}}
					onChange={handleQueryChange}
					placeholder="Search lead"
					value={query}
					variant="outlined"
				/>
			</Box>
			<PerfectScrollbar>
				<Box minWidth={700}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Full Name</TableCell>
								<TableCell>Email</TableCell>
								<TableCell>Gender</TableCell>
								<TableCell>Phone Number</TableCell>
								<TableCell>Industry</TableCell>
								<TableCell>Country</TableCell>
								{userRole === 'admin' && <TableCell>Created By</TableCell>}
								{userRole === 'admin' && <TableCell>Assigned To</TableCell>}
								<TableCell align="right">Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{leadList && leadList.length > 0 ? (
								leadList.map((lead, index) => {
									return (
										<TableRow hover key={index + 1}>
											<TableCell>
												<Box display="flex" alignItems="center">
													<Typography variant="body2" color="textSecondary">
														{`${lead.firstName} ${lead.lastName}`}
													</Typography>
												</Box>
											</TableCell>
											<TableCell>{lead.email}</TableCell>
											<TableCell>{lead.gender}</TableCell>
											<TableCell>{lead.phoneNumber}</TableCell>
											<TableCell>{lead.industry}</TableCell>
											<TableCell>{lead.country}</TableCell>
											{userRole === 'admin' && (
												<TableCell>{lead.createdBy ? lead.createdBy : 'NA'}</TableCell>
											)}
											{userRole === 'admin' && (
												<TableCell>{lead.assignedTo ? lead.assignedTo : 'NA'}</TableCell>
											)}

											<TableCell align="right">
												<Button
													color="primary"
													size="small"
													type="submit"
													variant="contained"
													onClick={() => viewDetailsHandler(lead)}
												>
													View Details
												</Button>
												<Button
													color="primary"
													size="small"
													type="submit"
													variant="contained"
													disabled={isOngoingCall}
													className={classes.callIcon}
													onClick={() => callLeadHandler(lead)}
												>
													<AddIcCallIcon />
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
					<Dialog
						onClose={() => {
							setDialog(false);
						}}
						aria-labelledby="simple-dialog-title"
						open={isDialogOpen}
						maxWidth="sm"
						fullWidth={true}
					>
						<DialogTitle id="simple-dialog-title">
							<Box fontWeight="fontWeightBold" fontSize={20}>
								Lead Details
							</Box>
						</DialogTitle>
						<DialogContent>
							<Grid container spacing={6}>
								<Grid item sm={5}>
									<Box fontWeight="fontWeightBold" fontSize={16}>
										Full Name :
									</Box>
								</Grid>
								<Grid item sm={6}>{`${selectedRecord.firstName} ${selectedRecord.lastName}`}</Grid>
							</Grid>
							<Grid container spacing={6}>
								<Grid item sm={5}>
									<Box fontWeight="fontWeightBold" fontSize={16}>
										Email :
									</Box>
								</Grid>
								<Grid item sm={6}>
									{selectedRecord.email}
								</Grid>
							</Grid>
							<Grid container spacing={6}>
								<Grid item sm={5}>
									<Box fontWeight="fontWeightBold" fontSize={16}>
										Address :
									</Box>
								</Grid>
								<Grid item sm={6}>
									{selectedRecord.unitNumber ? (
										`${selectedRecord.unitNumber},${selectedRecord.streetAddress},${selectedRecord.city},${selectedRecord.state},${selectedRecord.country},${selectedRecord.zipCode}`
									) : (
										`${selectedRecord.streetAddress},${selectedRecord.city},${selectedRecord.state},${selectedRecord.country},${selectedRecord.zipCode}`
									)}
								</Grid>
							</Grid>
							<Grid container spacing={6}>
								<Grid item sm={5}>
									<Box fontWeight="fontWeightBold" fontSize={16}>
										Company Name :
									</Box>
								</Grid>
								<Grid item sm={6}>
									{selectedRecord.companyName ? selectedRecord.companyName : 'NA'}
								</Grid>
							</Grid>
							<Grid container spacing={6}>
								<Grid item sm={5}>
									<Box fontWeight="fontWeightBold" fontSize={16}>
										Company Email :
									</Box>
								</Grid>
								<Grid item sm={6}>
									{selectedRecord.companyEmail ? selectedRecord.companyEmail : 'NA'}
								</Grid>
							</Grid>
							<Grid container spacing={6}>
								<Grid item sm={5}>
									<Box fontWeight="fontWeightBold" fontSize={16}>
										Website Url :
									</Box>
								</Grid>
								<Grid item sm={6}>
									{selectedRecord.websiteUrl ? (
										<Link href={selectedRecord.websiteUrl}>{selectedRecord.websiteUrl}</Link>
									) : (
										'NA'
									)}
								</Grid>
							</Grid>
							<Grid container spacing={6}>
								<Grid item sm={5}>
									<Box fontWeight="fontWeightBold" fontSize={16}>
										Company Address :
									</Box>
								</Grid>
								<Grid item sm={6}>
									{selectedRecord.companyStreetAddress ? selectedRecord.companyUnitNumber ? (
										`${selectedRecord.companyUnitNumber},${selectedRecord.companyStreetAddress},${selectedRecord.companyCity},${selectedRecord.companyState},${selectedRecord.companyCountry},${selectedRecord.companyZipCode}`
									) : (
										`${selectedRecord.companyStreetAddress},${selectedRecord.companyCity},${selectedRecord.companyState},${selectedRecord.companyCountry},${selectedRecord.companyZipCode}`
									) : (
										'NA'
									)}
								</Grid>
							</Grid>
							<Grid container spacing={6}>
								<Grid item sm={5}>
									<Box fontWeight="fontWeightBold" fontSize={16}>
										Company Number :
									</Box>
								</Grid>
								<Grid item sm={6}>
									{selectedRecord.companyNumber ? selectedRecord.companyNumber : 'NA'}
								</Grid>
							</Grid>
							<Grid container spacing={6}>
								<Grid item sm={5}>
									<Box fontWeight="fontWeightBold" fontSize={16}>
										Facebook Url :
									</Box>
								</Grid>
								<Grid item sm={6}>
									{selectedRecord.companyFacebookUrl ? (
										<Link href={selectedRecord.companyFacebookUrl}>
											{selectedRecord.companyFacebookUrl}
										</Link>
									) : (
										'NA'
									)}
								</Grid>
							</Grid>
							<Grid container spacing={6}>
								<Grid item sm={5}>
									<Box fontWeight="fontWeightBold" fontSize={16}>
										Twitter Url :
									</Box>
								</Grid>
								<Grid item sm={6}>
									{selectedRecord.companyTwitterUrl ? (
										<Link href={selectedRecord.companyTwitterUrl}>
											{selectedRecord.companyTwitterUrl}
										</Link>
									) : (
										'NA'
									)}
								</Grid>
							</Grid>
							<Grid container spacing={6}>
								<Grid item sm={5}>
									<Box fontWeight="fontWeightBold" fontSize={16}>
										Linkedin Url :
									</Box>
								</Grid>
								<Grid item sm={6}>
									{selectedRecord.companyLinkedinUrl ? (
										<Link href={selectedRecord.companyLinkedinUrl}>
											{selectedRecord.companyLinkedinUrl}
										</Link>
									) : (
										'NA'
									)}
								</Grid>
							</Grid>
						</DialogContent>
						<DialogActions>
							<Button
								onClick={() => {
									setDialog(false);
								}}
								color="primary"
							>
								Cancel
							</Button>
						</DialogActions>
					</Dialog>
				</Box>
			</PerfectScrollbar>
			<TablePagination
				component="div"
				count={leadList ? leadList.length : 0}
				onChangePage={handlePageChange}
				onChangeRowsPerPage={handleLimitChange}
				page={page}
				rowsPerPage={limit}
				rowsPerPageOptions={[ 5, 10, 25 ]}
			/>
		</Card>
	);
}

Results.propTypes = {
	className: PropTypes.string,
	leadList: PropTypes.array.isRequired,
	userRole: PropTypes.string.isRequired,
	searchQuery: PropTypes.func.isRequired,
	callLead: PropTypes.func.isRequired,
	hangUpCall: PropTypes.func.isRequired
};

Results.defaultProps = {
	leadList: [],
	userRole: 'admin',
	isOngoingCall: false
};

export default Results;
