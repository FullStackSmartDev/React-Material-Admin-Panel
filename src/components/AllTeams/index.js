
import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import { Grid, Divider  } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { useSelector, useDispatch } from 'react-redux';
import { setSelectedAgentToDisplay } from 'src/actions/agentsManagementAction';

import axios from 'axios';


import '../../assets/css/styles.scss';

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


export default function MyTeam() {
  const classes = useStyles();


  const agentsManagement = useSelector((state) => state.agentsManagement);
  const dispatch = useDispatch();

  const onChangeSelectedAgent = (agentObj) => {
    console.log(agentObj);
    dispatch(setSelectedAgentToDisplay(agentObj));
  };

  const [users, setUsers] = useState(null);
  const getProjects = useCallback(() => {
    axios
      .get('/api_mock/users_admin.json')
      .then((response) => {
        setUsers(response.data.users);
      });
  }, []);

  useEffect(() => {
    getProjects();


  }, [getProjects]);

  if (!users) {
    return null;
  }

  console.log(users);
  return (
    <div className={classes.root}>
      {
        users.map((item, key) => (
          (
            item.position === 'team-lead'
              ? (
                <Accordion key={key}>

                  <Grid container onClick={() => onChangeSelectedAgent(item)} style={{padding: '15px 0 0 15px'}} className="agent-box-wrapper" data-active={item.id === agentsManagement.agent.id}>
                    <Grid item xs={3}>
                      <Avatar src={item.avatar} className={classes.avatarLarge} />
                    </Grid>
                    <Grid item xs={5}>
                      <p className={classes.p}>{item.fullName}</p>
                      <p className={classes.p}>{`Position: ${item.position}`}</p>
                    </Grid>
                    <Grid item xs={4}>
                      <p className={classes.p}>Team Lead:</p>
                      <p className={classes.p}>{item.teamLead}</p>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      ></AccordionSummary>
                    </Grid>
                  </Grid>

                  <AccordionDetails style={{display: 'block'}}>
                    <Divider />
                    <br />
                    { users.map((item2, key2) => (item2.position === 'agent' && item2.teamId === item.teamId
                      ? (
                        <Grid container style={{ marginBottom: 15 }} key={key2} onClick={() => onChangeSelectedAgent(item2)} className="agent-box-wrapper" data-active={item2.id === agentsManagement.agent.id}>
                          <Grid item xs={3}>
                            <Avatar src={item2.avatar} className={classes.avatarLarge} />
                          </Grid>
                          <Grid item xs={5}>
                            <p className={classes.p}>{item2.fullName}</p>
                            <p className={classes.p}>{`Position: ${item2.position}`}</p>
                          </Grid>
                          <Grid item xs={4}>
                            <p className={classes.p}>Team Lead:</p>
                            <p className={classes.p}>{item2.teamLead}</p>
                          </Grid>
                        </Grid>
                      ) : ''))}
                  </AccordionDetails>
                </Accordion>
              ) : ('')
          )

        ))
      }
    </div>
  );
}
