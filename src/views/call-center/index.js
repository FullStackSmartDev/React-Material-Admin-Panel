import React from 'react';
import {
  Box, Grid,
  makeStyles, useTheme,
  Divider, FilledInput, TextField,
  FormControl, InputLabel, Select,
  Input, Button,
  MenuItem
} from '@material-ui/core';
import EventNoteIcon from '@material-ui/icons/EventNote';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import LeadsQueue from './LeadsQueue';
import LeadDetail from './LeadDetail';
import MyTeam from './MyTeam';
import SendDetail from './MyTeam/SendDetail';
import DialPad from './DialPad';

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
  scrolled: {
    maxHeight: 800,
    overflowY: 'scroll'
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
  textField: {
    width: '100%',
    marginTop: 20
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  buttonIcon: {
    borderRadius: '50%',
    width: 50,
    height: 50,
    display: 'grid',
    alignItems: 'center',
    backgroundColor: theme.palette.background.dark,
    boxShadow: '0 0 1px 0 rgba(0,0,0,0.70), 0 3px 4px -2px rgba(0,0,0,0.50)',
    color: theme.palette.text.primary,
    margin: '10px auto',
    fontSize: 30,
    cursor: 'pointer',
    '& svg': {
      margin: '0 auto'
    },
    '&:active': {
      transform: 'translateY(4px)',
      boxShadow: '0 0 3px 0 rgba(250,250,250,0.70), 0 3px 4px -2px rgba(0,0,0,0.50)',
    },
    '&:hover': {
      boxShadow: '0 0 3px 0 rgba(250,250,250,0.70), 0 3px 4px -2px rgba(0,0,0,0.50)',
    },
  },
  pColor: {
    color: theme.palette.text.primary
  }
}));

const callCenter = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const theme = useTheme();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const classes = useStyles(theme);

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <Box className={`${classes.boxStyle} ${classes.scrolled}`}>
            <h2 className={classes.boxHeading}>LEADS QUEUE</h2>
            <Divider />
            <br />
            <LeadsQueue />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <Box className={classes.boxStyle}>
            <h2 className={classes.boxHeading}>LEAD INFORMATION</h2>
            <Divider />
            <br />
            <LeadDetail />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <Box className={classes.boxStyle}>
            <h2 className={classes.boxHeading}>MY TEAM</h2>
            <Divider />
            <br />
            <MyTeam />
          </Box>
          <Box className={classes.boxStyle}>
            <SendDetail smsStatus emailStatus={false} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <Box className={classes.boxStyle}>
            <p className={classes.pColor} style={{ textAlign: 'center' }}>Call time: 00:27:81</p>
          </Box>
          <Box className={classes.boxStyle}>
            <DialPad />
          </Box>
          <Box className={classes.boxStyle}>
            <p className={classes.pColor} style={{ textAlign: 'center' }}>Client Local time: 15:35 / 03:35 pm</p>
          </Box>
          <Box>
            <Grid container>
              <Grid item xs={6}>
                <div
                  className={classes.buttonIcon}
                  style={{
                    float: 'right', margin: 5, backgroundColor: '#3949ab', color: 'white'
                  }}
                >
                  <EventNoteIcon />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div
                  className={classes.buttonIcon}
                  style={{
                    float: 'left', margin: 5, backgroundColor: '#3949ab', color: 'white'
                  }}
                >
                  <CreditCardIcon />
                </div>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default callCenter;
