import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Breadcrumbs,
  Link,
  Typography,
  makeStyles,
  Button
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles((theme) => ({
  root: {},
  backBtn:{
    marginBottom:theme.spacing(2)
  }
}));

function Header({ backHandler,className, ...rest }) {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Button
					color="secondary"
					variant="outlined"
					size="medium"
					onClick={backHandler}
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
        <Link
          variant="body1"
          color="inherit"
          to="/app/management"
          component={RouterLink}
        >
          Management
        </Link>
        <Typography
          variant="body1"
          color="textPrimary"
        >
          Leads
        </Typography>
      </Breadcrumbs>
      <Typography
        variant="h3"
        color="textPrimary"
      >
        Create new leads
      </Typography>
    </div>
  );
}

Header.propTypes = {
  className: PropTypes.string,
  backHandler:PropTypes.func.isRequired
};

export default Header;
