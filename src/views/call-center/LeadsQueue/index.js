import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  makeStyles, useTheme
} from '@material-ui/core';
import Lead from './Lead';
import axios from 'axios';

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
}));


function LeadsQueue() {
  const [leads, setLeads] = useState([]);

  const getLeads = useCallback(() => {
    axios
      .get('/api_mock/leads_queue.json')
      .then((response) => {
        setLeads(response.data.leads);
      });
  }, []);

  useEffect(() => {
    getLeads();
  }, [getLeads]);

  return (
    <Lead leadList={leads} />
  );
}
export default LeadsQueue;
