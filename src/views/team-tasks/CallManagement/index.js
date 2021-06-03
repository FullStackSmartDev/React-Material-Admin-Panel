import React from 'react';
import {
  Box, Grid,
  makeStyles, useTheme, Button
} from '@material-ui/core';
import { useSelector } from 'react-redux';

import HearingIcon from '@material-ui/icons/Hearing';
import PanToolIcon from '@material-ui/icons/PanTool';
import PermPhoneMsgIcon from '@material-ui/icons/PermPhoneMsg';
import CallEndIcon from '@material-ui/icons/CallEnd';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 25,
    marginLeft: 25,
    padding: 25,
  },
  colorGeneral: {
    color: `${theme.palette.text.primary}`
  },
  boxStyle: {
    color: theme.palette.text.primary,
    borderBottom: `1px solid ${theme.palette.background.dark}`,
    marginTop: 5,
    paddingBottom: 5
  },
  button: {
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    color: 'white',
    fontSize: '1.2rem',
  },
  iconWrap: {
    padding: 10,
    width: 40,
    height: 40,
    display: 'flex',
    borderRadius: '50%',
    fontSize: 20,
    marginRight: 20,
    backgroundColor: 'black'
  }
}));

const CallManagement = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <>
      <Box>
        <p className={classes.colorGeneral}>Call Management</p>
        <hr />
        <br />
        <Grid container>
          <Grid item xs={6}>
            <p className={classes.colorGeneral}>Call Status:</p>
            <br />
            <ul>
              <li className={classes.colorGeneral}>Agent is on the phone</li>
              <li className={classes.colorGeneral}>Agent is not on the phone</li>
            </ul>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" className={classes.button}>
              <div className={classes.iconWrap}><NotificationsOffIcon className={classes.icon} /></div>
              Resolve alert
            </Button>
            <br />
            <Button variant="contained" className={classes.button}>
              <div className={classes.iconWrap}><PanToolIcon className={classes.icon} /></div>
              Grab the call
            </Button>
            <br />
            <Button variant="contained" className={classes.button}>
              <div className={classes.iconWrap}><HearingIcon className={classes.icon} /></div>
              Spy the call
            </Button>
            <br />
            <Button variant="contained" className={classes.button}>
              <div className={classes.iconWrap}><PermPhoneMsgIcon className={classes.icon} /></div>
              Whisper to agent
            </Button>
            <br />
            <Button variant="contained" className={classes.button}>
              <div className={classes.iconWrap}><CallEndIcon className={classes.icon} /></div>
              End call
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CallManagement;
