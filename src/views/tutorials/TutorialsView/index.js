import React from 'react';
import {
  Grid, Box, makeStyles, useTheme
} from '@material-ui/core';

import YouTube from 'react-youtube-embed';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    borderRadius: 5,
    padding: 20
  },
  heading: {
    color: theme.palette.text.secondary,
    textAlign: 'center',
    padding: '20px 0 20px 0'
  },
  grid: {
    spacing: 8,
  }
}));

const TutorialsView = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <>
      <Box m={2} className={classes.root} minHeight={window.innerHeight / 2}>
        <h2 className={classes.heading}>SALES TIPS</h2>
        <Grid container>
          <Grid xs={3} m={2}>
            <Box m={1}><YouTube id="UfQS91N7gn0" /></Box>
          </Grid>
          <Grid xs={3} m={2}>
            <Box m={1}><YouTube id="WIwm8GDvX2I" /></Box>
          </Grid>
          <Grid xs={3} m={2}>
            <Box m={1}><YouTube id="4JPD-HoMOFw" /></Box>
          </Grid>
          <Grid xs={3} m={2}>
            <Box m={1}><YouTube id="4N0NvGGnDyw" /></Box>
          </Grid>
          <Grid xs={3} m={2}>
            <Box m={1}><YouTube id="PgkYa6gkEQ4" /></Box>
          </Grid>
          <Grid xs={3} m={2}>
            <Box m={1}><YouTube id="E6Csz_hvXzw" /></Box>
          </Grid>
          <Grid xs={3} m={2}>
            <Box m={1}><YouTube id="3oEv13ZYLig" /></Box>
          </Grid>
          <Grid xs={3} m={2}>
            <Box m={1}><YouTube id="6syYWh7FwA0" /></Box>
          </Grid>
          <Grid xs={3} m={2}>
            <Box m={1}><YouTube id="P9edKhp1xn8" /></Box>
          </Grid>
          <Grid xs={3} m={2}>
            <Box m={1}><YouTube id="d0mwebxFxBc" /></Box>
          </Grid>
          <Grid xs={3} m={2}>
            <Box m={1}><YouTube id="fACos5OzZrc" /></Box>
          </Grid>
          <Grid xs={3} m={2}>
            <Box m={1}><YouTube id="ClhZhExTnlE" /></Box>
          </Grid>
          <Grid xs={3} m={2}>
            <Box m={1}><YouTube id="xMOGd1eS31A" /></Box>
          </Grid>
          <Grid xs={3} m={2}>
            <Box m={1}><YouTube id="Dcxo4ipNndE" /></Box>
          </Grid>
          <Grid xs={3} m={2}>
            <Box m={1}><YouTube id="ejrHbB3_-zM" /></Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default TutorialsView;
