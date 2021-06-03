import React from 'react';
import {
  Box, Grid,
  makeStyles, useTheme
} from '@material-ui/core';

import AccordionComp from '../Accordion';
import MessageComp from '../Message';
import MessageBox from '../MessageBox';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 25,
    marginLeft: 25,
    padding: 25,
  },
  boxStyle: {
    marginTop: 50,
    marginLeft: 25,
    marginRight: 25,
    padding: 25,
    backgroundColor: theme.palette.background.default,
    borderRadius: 5,
    boxShadow: '0 0 1px 0 rgba(0,0,0,0.70), 0 3px 4px -2px rgba(0,0,0,0.50)',
  }
}));

const FaqView = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <Box className={classes.root}>
            <AccordionComp />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box className={classes.boxStyle}>
            <MessageComp />
            <MessageBox />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default FaqView;
