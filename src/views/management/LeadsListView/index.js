import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Box, Container, makeStyles, Typography, Dialog, IconButton } from '@material-ui/core';
import { get } from 'lodash';
import Page from 'src/components/Page';
import { getLeadList, searchLead,storeCurrentLead} from 'src/actions/leadActions';

import Header from './Header';
import Results from './Results';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.dark,
		minHeight: '100%',
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3)
	}
}));

function ListLeads(props) {
	const classes = useStyles();
	const[leadEmail,setLeadEmail]=useState("");
	const user = useSelector((state) => state.account.user);
	const leadList = useSelector((state) => state.leads.leadList);
	const currentLeadId=useSelector(state=>state.leads.currentLeadId)

	const { enqueueSnackbar } = useSnackbar();

	const dispatch = useDispatch();

	let userInfo = {};
	if (user && Object.keys(user).length > 0) {
		userInfo = get(user, 'data', {});
	}

	useEffect(() => {
		getLeads();
	}, []);

	const getLeads = async () => {
		const data = {
			role: userInfo.role ? userInfo.role : '',
			email: userInfo.email
		};
		try {
			await dispatch(getLeadList(data));
		} catch (err) {
			const error = err || 'Something went wrong';
			enqueueSnackbar(error, {
				variant: 'error'
			});
		}
	};
	const searchLeadHandler = async (value) => {
		const data = {
			searchQuery: value
		};
		await dispatch(searchLead(data));
	};
	const callLeadHandler = async (record) => {
		props.history.push(`/app/management/leads/call/${record.leadId}`)
		dispatch(storeCurrentLead(record.leadId))
	};
	const backHandler=()=>{
		props.history.push(`/app/management/leads/call/${currentLeadId}`)
	}
	return (
		<React.Fragment>
			<Page className={classes.root} title="Customer List">
				<Container maxWidth={false}>
					<Header fetchLeads={getLeads}
					backHandler={backHandler}
					/>
					{leadList && (
						<Box mt={3}>
							<Results
								leadList={leadList}
								userRole={userInfo.role}
								searchQuery={searchLeadHandler}
								callLead={callLeadHandler}
							/>
						</Box>
					)}
				</Container>
			</Page>
		</React.Fragment>
	);
}
export default ListLeads;
