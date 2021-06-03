import React from 'react';
import {
  Box, makeStyles, Avatar, Grid
} from '@material-ui/core';
import { useSelector } from 'react-redux';

import MailIcon from '@material-ui/icons/Mail';
import SmsIcon from '@material-ui/icons/Sms';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#282C34',
    borderRadius: 5
  },
  heading: {
    color: 'white',
    textAlign: 'center',
    paddingTop: 20
  },
  row: {
    marginBottom: theme.spacing(2)
  },
  icon: {
    color: '#357a38',
  }
}));

function SendDetail({ mailStatus, smsStatus }) {
  const classes = useStyles();

  const selectedLead = useSelector((state) => state.selectedLead);

  const checkIfSent = (mean) => (mean === 'email' ? selectedLead.lead.emailSent : selectedLead.lead.smsSent);

  return (
    <Box m={1} p={2}>
      <Grid container className={classes.row}>
        <Grid item xs={4} />
        <Grid item xs={4}>
          <Box color="white" fontSize={18}>
            Status
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box color="white" fontSize={18} display="flex" justifyContent="center">
            Action
          </Box>
        </Grid>
      </Grid>
      <Grid container className={classes.row}>
        <Grid item xs={4} fontSize={18} color="white">
          <Box color="white">EMAIL</Box>
        </Grid>
        <Grid item xs={4}>
          <Box color={checkIfSent('email') === true ? '#357a38' : '#2196f3'} fontSize={checkIfSent('email') === true ? 18 : 16}>
            {checkIfSent('email') === true ? ' Sent' : ' Not sent'}
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box color="white" fontSize={18} display="flex" justifyContent="center">
            <MailIcon className={classes.icon} />
          </Box>
        </Grid>
      </Grid>
      <Grid container className={classes.row}>
        <Grid item xs={4} fontSize={18}>
          <Box color="white">SMS</Box>
        </Grid>
        <Grid item xs={4}>
          <Box color={checkIfSent('sms') === true ? '#357a38' : '#2196f3'} fontSize={checkIfSent('sms') === true ? 18 : 16}>
            {checkIfSent('sms') === true ? ' Sent' : ' Not sent'}
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box color="white" fontSize={18} display="flex" justifyContent="center">
            <SmsIcon className={classes.icon} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
SendDetail.defaultProps = {
  mailStatus: false,
  smsStatus: false
};
export default SendDetail;
