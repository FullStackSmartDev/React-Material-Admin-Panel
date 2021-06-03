import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(20),
      padding: 20,
      '& h4': {
        fontSize: 12,
        fontWeight: 'normal'
      },
      '& p': {
        marginTop: 20,
        fontSize: 22
      }
    }
  }
}));

export default function SimplePaper() {
  const classes = useStyles();
  const agentsManagement = useSelector((state) => state.agentsManagement);

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <h4>Total Calls</h4>
        <p>{agentsManagement.agent.totalCalls}</p>
      </Paper>
      <Paper elevation={3}>
        <h4>Total Calls Time</h4>
        <p>{agentsManagement.agent.totalCallsTime}</p>
      </Paper>
      <Paper elevation={3}>
        <h4>Leads To Customers</h4>
        <p>{agentsManagement.agent.leadsToCustomers}</p>
      </Paper>
      <Paper elevation={3}>
        <h4>Total Calls Cost</h4>
        <p>${agentsManagement.agent.totalCallsCost}</p>
      </Paper>
    </div>
  );
}
