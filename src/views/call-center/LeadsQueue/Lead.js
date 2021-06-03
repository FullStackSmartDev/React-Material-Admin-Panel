import React, { useEffect, useState } from 'react';
import { Box, Grid, makeStyles } from '@material-ui/core';
import Proptypes from 'prop-types';
import '../styles.scss';

import { useSelector, useDispatch } from 'react-redux';
import { setSelectedLeadToDisplay } from 'src/actions/callCenterLeadsAction';

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

function Lead({ leadList }) {
  const classes = useStyles();

  const selectedLead = useSelector((state) => state.selectedLead);
  const dispatch = useDispatch();

  const onChangeSelectedLead = (leadObj) => {
    dispatch(setSelectedLeadToDisplay(leadObj));
  };


  return leadList && leadList.length > 0 ? (
    leadList.map((lead, key) => (
      <div className="lead-box-wrapper" data-active={lead.id === selectedLead.lead.id} key={key}>
        <Box className={classes.agentBox} onClick={() => onChangeSelectedLead(lead)}>
          <Grid container>
            <Grid item xs={6}>
              <p className={classes.p}>{lead.companyName}</p>
              <p className={classes.p}>{lead.companyNumber}</p>
            </Grid>
            <Grid item xs={6}>
              <p className={classes.p}><strong>Status</strong></p>
              <p className={classes.p}>
                {lead.status}
              </p>
            </Grid>
          </Grid>
        </Box>
      </div>
    ))
  ) : (
    <Box className={classes.agentBox}>
      No Leads in Queue
    </Box>
  );
}
export default Lead;
