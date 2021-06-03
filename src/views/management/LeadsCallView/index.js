import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { get } from 'lodash';
import { useSnackbar } from 'notistack';
import Page from 'src/components/Page';
import {
  getLeadById, agentCallDetails, setOngoingCall, storeOutgoingCallDetails
} from 'src/actions/leadActions';
import LeadDetail from './LeadDetail';
import CallDetail from './CallDetail';
import PreviousCallList from './PreviousCallList';

function LeadsCallView(props) {
  const [device, setDevice] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.account.user);
  const callDetails = useSelector((state) => state.leads.agentCallDetails);

  const leadByIdResponse = useSelector((state) => state.leads.leadByIdResponse);

  const lead = get(leadByIdResponse, 'lead', {});
  const callList = get(callDetails, 'calls', []);
  const leadId = get(props.match.params, 'leadId', '');


  let userInfo = {};
  if (user && Object.keys(user).length > 0) {
    userInfo = get(user, 'data', {});
  }

  useEffect(() => {
    const callApi = async () => {
      await getLeadByIdHandler();
      await getPreviousCallDetails();
    };
    callApi();
  }, []);

  const updateStatusHandler = async () => {
    await getLeadByIdHandler();
    await getPreviousCallDetails();
  };
  const getLeadByIdHandler = async () => {
    const data = {
      role: userInfo.role,
      leadId
    };
    if (leadId) {
      try {
        await dispatch(getLeadById(data));
      } catch (err) {
        props.history.push('/app/management/leads');
        const error = err || 'Something went wrong';
        enqueueSnackbar(error, {
          variant: 'error'
        });
      }
    } else {
      props.history.push('/app/management/leads');
    }
  };
  const getPreviousCallDetails = async () => {
    const data = {
      leadId,
      agentEmail: userInfo.email,
      role: userInfo.role
    };
    await dispatch(agentCallDetails(data));
  };

  return (
    <Page title="Leads Create">
      <Container maxWidth={false}>
        <Grid container>
          <Grid item xs={6}>
            <LeadDetail leadDetails={lead} />
          </Grid>
          <Grid item xs={6}>
            <CallDetail
              phoneNumber={lead.phoneNumber}
              leadEmail={lead.email}
              leadName={`${lead.firstName} ${lead.lastName}`}
              companyName={lead.companyName}
              leadId={leadId}
              submitComments={getLeadByIdHandler}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <PreviousCallList callList={callList} updateStatus={updateStatusHandler} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
export default LeadsCallView;
