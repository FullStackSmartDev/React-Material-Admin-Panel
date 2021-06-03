import React from 'react';
import {
  Grid, Box, makeStyles, useTheme
} from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    background: '#434a57',
    borderRadius: '.2em',
    padding: '15px',
    boxShadow: '0 0 1px 0 rgba(0,0,0,0.70), 0 3px 4px -2px rgba(0,0,0,0.50)',
    width: '92%',
    color: 'white',
    '&::before': {
      content: "''",
      position: 'absolute',
      bottom: 0,
      left: '89%',
      width: 0,
      height: 0,
      border: '35px solid transparent',
      borderTopColor: '#434a57',
      borderBottom: 0,
      borderRight: 0,
      marginLeft: '-17.5px',
      marginBottom: '-35px',
    }
  },
  avatarIcon: {
    borderRadius: '50%',
    maxWidth: '50px',
    marginTop: '15px',
  }
}));

const MessageView = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <>
      <div className={classes.root}>
        <p className="MuiTypography-body1">
          If you have any question please do not hesitate to ask. We will review it and will ad the answer on the list.
        </p>
      </div>
      <div style={{ textAlign: 'right' }}>
        <img src="/static/images/me2.jpg" alt="" className={classes.avatarIcon} />
      </div>
    </>
  );
};

export default MessageView;
