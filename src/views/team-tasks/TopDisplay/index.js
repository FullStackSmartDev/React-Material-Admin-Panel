import React, { useEffect } from 'react';
import {
  Paper, Box, makeStyles, Grid, Divider
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import RemoveIcon from '@material-ui/icons/Remove';
import { setSelectedAgentToDisplay } from '../../../actions/agentsManagementAction';

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
        fontWeight: 'normal',
      },
      '& p': {
        marginTop: 20,
        fontSize: 22,
      }
    },
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
  title: {
    color: theme.palette.text.primary,
    textTransform: 'uppercase',
    fontSize: '12pt',
    marginBottom: '5px'
  },
  txt: {
    color: theme.palette.text.primary,
    fontSize: 40,
  },
  divider: {
    float: 'right',
    marginTop: -82,
    marginRight: 10
  },
  icon: {
    width: 25,
    height: 25,
    borderRadius: '50%',
    backgroundColor: '#797f8b',
    marginBottom: -9,
    padding: 3,
    fontWeight: 'bold'
  }
}));

export default function SimplePaper() {
  const classes = useStyles();

  const agentsManagement = useSelector((state) => state.agentsManagement);

  return (
    <div>
      <Grid container>
        <Grid item xs={3}>
          <Box className={classes.boxStyle}>
            <h4 className={classes.title}>Active Calls</h4>
            <p className={classes.txt}>0</p>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box className={classes.boxStyle}>
            <h4 className={classes.title}>Waiting Calls</h4>
            <p className={classes.txt}>0</p>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box className={classes.boxStyle}>
            <Grid container>
              <Grid item xs={4}>
                <h4 className={classes.title}>
                  <CheckIcon className={classes.icon} style={{ background: 'green' }} />
                  {' '}
                  Available Agents
                </h4>
                <p className={classes.txt}>0</p>
                <Divider orientation="vertical" className={classes.divider} />
              </Grid>
              <Grid item xs={4}>
                <h4 className={classes.title}>
                  <CloseIcon className={classes.icon} style={{ background: 'red' }} />
                  {' '}
                  Unavailable Agents
                </h4>
                <p className={classes.txt}>0</p>
                <Divider orientation="vertical" className={classes.divider} />
              </Grid>
              <Grid item xs={4}>
                <h4 className={classes.title}>
                  <RemoveIcon className={classes.icon} />
                  {' '}
                  Offline Agents
                </h4>
                <p className={classes.txt}>0</p>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>


    </div>
  );
}
