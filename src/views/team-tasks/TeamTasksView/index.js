import React from 'react';
import {
  Box, Grid,
  makeStyles, useTheme
} from '@material-ui/core';
import { useSelector } from 'react-redux';

import TopDisplay from '../TopDisplay';
import MyTeam from '../../../components/MyTeam';
import AllTeams from '../../../components/AllTeams';
import LeadDetail from '../LeadDetail';
import BookedEvents from '../BookedEvents';
import CallManagement from '../CallManagement';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 25,
    marginLeft: 25,
    padding: 25,
  },
  boxStyle: {
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    padding: 25,
    backgroundColor: theme.palette.background.default,
    borderRadius: 5,
    boxShadow: '0 0 1px 0 rgba(0,0,0,0.70), 0 3px 4px -2px rgba(0,0,0,0.50)',
  },
  boxStyle2: {
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    padding: 0,
    borderRadius: 5,
  },
  boxHeading: {
    color: theme.palette.text.primary,
    textAlign: 'center',
    textTransformation: 'uppercase',
    fontSize: '11pt',
    marginBottom: '5px'
  },
  hr: {
    background: 'none',
    border: `1px solid ${theme.palette.split}`,
    opacity: 0.2
  },

}));

const AgentsManagementView = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const userRole = useSelector((state) => state.account.user.data.role);
  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <TopDisplay />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          { userRole !== 'admin'
            ? <Box className={classes.boxStyle}><MyTeam /></Box>
            : <Box className={classes.boxStyle2}><AllTeams /></Box>}
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Box className={classes.boxStyle}>
            <CallManagement />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Box className={classes.boxStyle}>
            <LeadDetail />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <Box className={classes.boxStyle}>
            <BookedEvents />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default AgentsManagementView;
