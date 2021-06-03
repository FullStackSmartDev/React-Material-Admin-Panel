import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Breadcrumbs,
  Grid,
  Link,
  Typography,
  makeStyles,
  Button
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles((theme) => ({
  root: {},
  headingText: { marginTop: theme.spacing(1) },
  backBtn: { marginBottom: theme.spacing(2) }
}));

function Header({ backHandler, ...rest }) {
  const classes = useStyles();

  const backToPage = () => {
    backHandler();
  };

  return (
    <Grid
      className={clsx(classes.root)}
      container
      justify="space-between"
      spacing={3}
      {...rest}
    >
      <Grid item>
        <Button
          color="secondary"
          variant="outlined"
          size="medium"
          onClick={backToPage}
          className={classes.backBtn}
        >
          Back
        </Button>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            variant="body1"
            color="inherit"
            to="/app"
            component={RouterLink}
          >
            Dashboard
          </Link>
          <Typography variant="body1" color="textPrimary">
            Manage Users
          </Typography>
        </Breadcrumbs>
        <Typography
          variant="h3"
          color="textPrimary"
          className={classes.headingText}
        >
          All Users
        </Typography>
      </Grid>
    </Grid>
  );
}

Header.propTypes = {
  className: PropTypes.string,
  backHandler: PropTypes.func.isRequired
};

export default Header;
