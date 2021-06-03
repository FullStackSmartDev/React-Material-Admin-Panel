import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Box, useTheme } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 5,
    padding: 20
  },
  box: {
    backgroundColor: theme.palette.background.default,
    borderRadius: 5,
    padding: '20px',
    '& ul, & p' : {
      color: theme.palette.text.secondary,
      fontSize: '12px',
      letterSpacing: '1px'
    },
    '& ul': {
      marginLeft: '17px',
      marginTop: '10px'
    }
  },
  heading: {
    color: theme.palette.text.secondary,
    textAlign: 'center',
    padding: '20px 0 20px 0'
  },
  table: {
    minWidth: 650,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return {
    name, calories, fat, carbs, protein
  };
}

const rows = [
  createData('Price', '$599', '$799', 'Call Us', 'Call Us'),
  createData('Price Description', '$200 setup fee + $33.25 monthly ', '$200 setup fee + $49.90 monthly', 'Call Us', 'Call Us'),
  createData('Responsive Design', <CheckCircleOutlineIcon />, <CheckCircleOutlineIcon />, <CheckCircleOutlineIcon />, <CheckCircleOutlineIcon />),
  createData('Custom Domain Name (i)', <CheckCircleOutlineIcon />, <CheckCircleOutlineIcon />, <CheckCircleOutlineIcon />, <CheckCircleOutlineIcon />),
  createData('Domain Transfer', <CheckCircleOutlineIcon />, <CheckCircleOutlineIcon />, <CheckCircleOutlineIcon />, <CheckCircleOutlineIcon />),
  createData('Portfolio Gallery Page', '10 images', '20 images', '100 images', 'Call us'),
  createData('Logo Integration', <CheckCircleOutlineIcon />, <CheckCircleOutlineIcon />, <CheckCircleOutlineIcon />, <CheckCircleOutlineIcon />),
  createData('Contact Page', <CheckCircleOutlineIcon />, <CheckCircleOutlineIcon />, <CheckCircleOutlineIcon />, <CheckCircleOutlineIcon />),
  createData('Pre-Written Content', <CheckCircleOutlineIcon />, <CheckCircleOutlineIcon />, <CheckCircleOutlineIcon />, <CheckCircleOutlineIcon />),
  createData('Google Maps Integration', <CheckCircleOutlineIcon />, <CheckCircleOutlineIcon />, <CheckCircleOutlineIcon />, <CheckCircleOutlineIcon />),
  createData('Social Media Integration', <CheckCircleOutlineIcon />, <CheckCircleOutlineIcon />, <CheckCircleOutlineIcon />, <CheckCircleOutlineIcon />),
  createData('Developer Consultation', <CheckCircleOutlineIcon />, <CheckCircleOutlineIcon />, <CheckCircleOutlineIcon />, <CheckCircleOutlineIcon />),
  createData('Creative Services', '1 hour', '2 hours', 'Call us', '10 hours +'),
  createData('Hosting', <CheckCircleOutlineIcon />, <CheckCircleOutlineIcon />, <CheckCircleOutlineIcon />, 'Call us'),
];

const PricesAndPackagesView = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Box m={2} className={classes.root} minHeight={window.innerHeight / 2}>
      <h2 className={classes.heading}>Website Design And Development</h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Features</TableCell>
              <TableCell align="right">Business</TableCell>
              <TableCell align="right">Business Plus</TableCell>
              <TableCell align="right">E-commerce</TableCell>
              <TableCell align="right">Custom</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ marginTop: '20px' }}>
        <Box className={classes.box}>
          <p>(i) Domains: The requirements for the domain to be included in the package are the following:</p>
          <ul>
            <li>Domain must not exceed $10 per year.</li>
            <li>Domain must have extension .COM / .US / .INFO / .NET / .ORG / .CO </li>
          </ul>
        </Box>
      </div>
    </Box>
  );
};

export default PricesAndPackagesView;
