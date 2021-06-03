import React, { useEffect, useState } from 'react';
import {
  Box, Grid,
  makeStyles, useTheme,
  Divider, FilledInput, TextField,
  FormControl, InputLabel, Select,
  Input, Button,
  MenuItem, IconButton,
  InputBase, Paper
} from '@material-ui/core';
import { useSelector, useDispatch} from 'react-redux';


import PhoneForwardedIcon from '@material-ui/icons/PhoneForwarded';
import MicOffIcon from '@material-ui/icons/MicOff';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import CallEndIcon from '@material-ui/icons/CallEnd';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import BackspaceIcon from '@material-ui/icons/Backspace';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import useDialer from 'src/hooks/useDialer';

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'white',
    textAlign: 'center'
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
  paperStyle: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    border: `1px solid ${theme.palette.background.dark}`,
    borderRadius: 5,
    marginBottom: 20
  },
  paperStyleInput: {
    marginLeft: theme.spacing(1),
    flex: 1,
    color: theme.palette.text.primary,
    fontSize: 20
  }
}));

const Dailpad = () => {
  const { device }  = useDialer();
  const [onPhone, setOnPhone] = useState(false);
  const [muted, setMuted] = useState(false);
  const [status, setStatus] = useState('Connecting');
  const [conn, setConn] = useState(null);

  const theme = useTheme();
  const classes = useStyles(theme);
  const selectedLead = useSelector((state) => state.selectedLead);
  const token = useSelector((state) => state.dial.token)
  
  const [phoneNumber, setSetPhoneNumber] = React.useState('');
  const onNumberKeyPress = (e) => {
    // const regex = /^(?=.*?[1-9])[0-9()-]+$/;
    // const str = phoneNumber + e.target.dataset.value;
    // const result = regex.test(str);
    let num = e.target.dataset.value.toString();
    // Device.activeConnection().sendDigits(num);
    if (e.target.dataset.value) {
      const numb = phoneNumber.toString() + e.target.dataset.value.toString();
      setSetPhoneNumber(numb);
    }
  };


  const startCall = ()=>{
    setStatus("Calling " + phoneNumber)
    if(device)
      device.connect({ To: phoneNumber });
  }

  const endCall = () =>{
    setStatus("Call ended.")
    if(device)
      device.disconnectAll();
  }

  const handleToggleMute = () =>{
    const newState = !muted;
    setMuted(newState);
    if(!device) return;
    if(device.activeConnection())
      device.activeConnection().mute(newState);
  }

  const onPhoneInputChange = (e) => {
    // const regex = /^(?=.*?[1-9])[0-9()-]+$/;
    // const str = e.target.value;
    // const result = regex.test(str);
    setSetPhoneNumber(e.target.value);
  };
  const onResetKeyPress = () => {
    setSetPhoneNumber('');
  };

  const onDelKeyPress = () => {
    const numb = phoneNumber.substring(0, phoneNumber.length - 1);
    setSetPhoneNumber(numb);
  };

  const onNumberPrefillKeyPress = () => {
    setSetPhoneNumber(selectedLead.lead.companyNumber);
  };

  useEffect(() => {
    setSetPhoneNumber(selectedLead.lead.companyNumber);
  }, [selectedLead]);

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <div className={classes.paperStyle}>
            <InputBase
              className={classes.paperStyleInput}
              placeholder="Phone Number: "
              value={phoneNumber}
              onChange={onPhoneInputChange}
              type="phone"
            />
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton color="primary" aria-label="directions" onClick={onResetKeyPress}>
              <HighlightOffIcon />
            </IconButton>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.buttonIcon} onClick={onNumberKeyPress} data-value="1">1</div>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.buttonIcon} onClick={onNumberKeyPress} data-value="2">
            2
            <span style={{ fontSize: 10, marginTop: -10 }}>ABC</span>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.buttonIcon} onClick={onNumberKeyPress} data-value="3">
            3
            <span style={{ fontSize: 10, marginTop: -10 }}>DEF</span>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.buttonIcon} onClick={onNumberKeyPress} data-value="4">
            4
            <span style={{ fontSize: 10, marginTop: -10 }}>GHI</span>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.buttonIcon} onClick={onNumberKeyPress} data-value="5">
            5
            <span style={{ fontSize: 10, marginTop: -10 }}>JKL</span>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.buttonIcon} onClick={onNumberKeyPress} data-value="6">
            6
            <span style={{ fontSize: 10, marginTop: -10 }}>MNO</span>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.buttonIcon} onClick={onNumberKeyPress} data-value="7">
            7
            <span style={{ fontSize: 10, marginTop: -10 }}>PQRS</span>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.buttonIcon} onClick={onNumberKeyPress} data-value="8">
            8
            <span style={{ fontSize: 10, marginTop: -10 }}>TUV</span>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.buttonIcon} onClick={onNumberKeyPress} data-value="9">
            9
            <span style={{ fontSize: 10, marginTop: -10 }}>WXYZ</span>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.buttonIcon} onClick={onNumberKeyPress} data-value="*">*</div>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.buttonIcon} onClick={onNumberKeyPress} data-value="0">
            0
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.buttonIcon} onClick={onNumberKeyPress} data-value="#">#</div>
        </Grid>

        <Grid item xs={4}>
          <div className={classes.buttonIcon} onClick={onDelKeyPress}>
            <BackspaceIcon />
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.buttonIcon} onClick={onNumberKeyPress} data-value="+">
            +
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.buttonIcon} onClick={onNumberPrefillKeyPress} data-value="+#">
            <ContactPhoneIcon />
          </div>
        </Grid>
        <Divider />
      </Grid>
      <Grid container style={{ marginTop: 20 }}>
        <Grid item xs={3}>
          <div className={classes.buttonIcon} style={{ background: 'orange', color: 'white' }}><PhoneForwardedIcon /></div>
        </Grid>
        <Grid item xs={3}>
          <div className={classes.buttonIcon} style={{ background: '#6d6d6d', color: 'white' }} onClick={handleToggleMute}><MicOffIcon /></div>
        </Grid>
        <Grid item xs={3}>
          <div className={classes.buttonIcon} style={{ background: 'green', color: 'white' }} onClick={startCall}><PhoneInTalkIcon /></div>
        </Grid>
        <Grid item xs={3}>
          <div className={classes.buttonIcon} style={{ background: 'red', color: 'white' }} onClick={endCall}><CallEndIcon /></div>
          
        </Grid>
        
      </Grid>
    </div>
  );
};
export default Dailpad;
