import React from  'react';
import {
  Box, Grid,
  makeStyles, useTheme,
  Divider, FilledInput, TextField,
  FormControl, InputLabel, Select,
  Input, Button,
  MenuItem, IconButton,
  InputBase, Paper
} from '@material-ui/core';

import prodElectricianThumb from '../../../assets/images/products/electrician_thumb.jpg';
import prodPaintingThumb from '../../../assets/images/products/painting_thumb.jpg';
import prodHvacThumb from '../../../assets/images/products/hvac_thumb.jpg';

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
  },
  boxStyle: {
    padding: 15,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 5,
    boxShadow: '0 0 1px 0 rgba(0,0,0,0.70), 0 3px 4px -2px rgba(0,0,0,0.50)',
    marginBottom: '15px',
    '& img': {
      maxWidth: '100%'
    }
  },
  title: {
    color: theme.palette.text.secondary,
  },
  h2: {
    color: theme.palette.text.secondary,
    fontWeight: 600,
    fontSize: '1rem'
  }
}));

const ProductsView = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>
        <br />
        <h1 className={classes.title}>Products</h1>
        <br />
      </div>
      <Grid container>
        <Grid item xs={12} sm={6} md={4}>
          <Box className={classes.boxStyle} m={1} p={2}>
            <h2 className={classes.h2}>Electrician</h2>
            <img src={prodElectricianThumb} alt="" />
            <Button variant="contained" color="primary" href="http://biramedia.com/client/1/electrician/" target="_blank">View Example</Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box className={classes.boxStyle} m={1} p={2}>
            <h2 className={classes.h2}>Painting</h2>
            <img src={prodPaintingThumb} alt="" />
            <Button variant="contained" color="primary" href="http://biramedia.com/client/1/painting/" target="_blank">View Example</Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box className={classes.boxStyle} m={1} p={2}>
            <h2 className={classes.h2}>HVAC</h2>
            <img src={prodHvacThumb} alt="" />
            <Button variant="contained" color="primary" href="http://biramedia.com/client/1/hvac/" target="_blank">View Example</Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
};

export default ProductsView;
