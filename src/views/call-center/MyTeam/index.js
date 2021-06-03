import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import { Grid, Button, Divider } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';

import '../styles.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
  agentBox: {
    padding: 15,
    backgroundColor: theme.palette.background.dark,
    borderRadius: 5,
    boxShadow: '0 0 1px 0 rgba(0,0,0,0.70), 0 3px 4px -2px rgba(0,0,0,0.50)',
    marginBottom: '15px',
    '&$disabled': {
      color: 'white',
    },
  },
  avatarLarge: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  p: {
    color: theme.palette.text.primary,
    fontSize: '10pt'
  },
  msgp: {
    color: theme.palette.text.primary,
    textAlign: 'center',
    fontSize: '80%'
  },
  agentBoxDraggableArea: {
    height: '100px',
    border: `2px dashed ${theme.palette.background.dark}`,
    borderRadius: '5px',
    marginBottom: '20px',
    placeItems: 'center',
    display: 'grid',
    textAlign: 'center',
    padding: '25px',
    '& p': {
      color: theme.palette.text.primary,
      opacity: '0.3'
    }
  }
}));

const agentsData = [
  {
    fullName: 'Leonardo De Vincci',
    position: 'agent',
    teamLead: 'Ilia Svinin',
    avatar: 'https://material-ui.com/static/images/avatar/2.jpg',
    display: true,
    status: 'Break',
  },
  {
    fullName: 'Ilia Svinin',
    position: 'team lead',
    teamLead: '',
    avatar: 'https://material-ui.com/static/images/avatar/2.jpg',
    display: false,
    status: 'Available',
  },
  {
    fullName: 'Thomas Edison',
    position: 'agent',
    teamLead: 'Ilia Svinin',
    avatar: 'https://material-ui.com/static/images/avatar/2.jpg',
    display: false,
    status: 'Not available',
  }
];

export default function MyTeam() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {
        agentsData.map((item, key) => (item.position === 'team lead' ? (
          // eslint-disable-next-line react/no-array-index-key
          <div className="agent-box-wrapper" data-active={false} key={key}>
            <Box className={classes.agentBox}>
              <Grid container>
                <Grid item xs={3}>
                  <Avatar alt={item.fullName} src={item.avatar} className={classes.avatarLarge} />
                </Grid>
                <Grid item xs={5}>
                  <p className={classes.p}>{item.fullName}</p>
                  <p className={classes.p}>{item.position}</p>
                </Grid>
                <Grid item xs={4}>
                  <p className={classes.p}>Status:</p>
                  <p className={classes.p}>{item.status}</p>
                </Grid>
              </Grid>
            </Box>
          </div>
        ) : (
          ''
        )))
      }
      <div style={{ textAlign: 'center' }}>
        <Button variant="contained" style={{ backgroundColor: 'gray', color: 'white' }}>
          Notify your lead of a difficulty <NotificationsIcon />
        </Button>
      </div>
      <br />
      <Divider />
      <br />
      {
        agentsData.map((item, key) => item.position === 'agent' ? (
          <div className="agent-box-wrapper" data-active={item.display} key={key}>
            <Box className={classes.agentBox}>
              <Grid container>
                <Grid item xs={3}>
                  <Avatar alt={item.fullName} src={item.avatar} className={classes.avatarLarge} />
                </Grid>
                <Grid item xs={5}>
                  <p className={classes.p}>{item.fullName}</p>
                  <p className={classes.p}>{item.position}</p>
                </Grid>
                <Grid item xs={4}>
                  <p className={classes.p}>Status:</p>
                  <p className={classes.p}>{item.status}</p>
                </Grid>
              </Grid>
            </Box>
          </div>
        ) : (
          ''
        ))
      }
    </div>
  );
}

