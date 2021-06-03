import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Accordion } from '@material-ui/core';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 630,
    overflowY: 'scroll'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

export default function SimpleAccordion() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Date 00:53:26 UTC 2020-11-25
          </Typography>
        </AccordionSummary>
        <AccordionDetails>{/*<AudioPlayer />*/}</AccordionDetails>
      </Accordion>
    </div>
  );
}
