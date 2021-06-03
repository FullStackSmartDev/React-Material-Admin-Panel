import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Button, Breadcrumbs, Grid, Link, SvgIcon, Typography, makeStyles } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { PlusCircle as PlusCircleIcon } from 'react-feather';

const useStyles = makeStyles((theme) => ({
	root: {},
	action: {
		marginBottom: theme.spacing(1),
		'& + &': {
			marginLeft: theme.spacing(1)
		}
	},
	actionIcon: {
		marginRight: theme.spacing(1)
  },
  backBtn:{
    marginBottom:theme.spacing(2)
  }
}));

function Header({ backHandler, className, onEventAdd, ...rest }) {
	const classes = useStyles();

	return (
		<Grid className={clsx(classes.root, className)} container justify="space-between" spacing={3} {...rest}>
			<Grid item>
      <Button color="secondary" variant="outlined" size="medium" onClick={backHandler} className={classes.backBtn}>
				Back 
			</Button>
				<Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
					<Link variant="body1" color="inherit" to="/app" component={RouterLink}>
						Dashboard
					</Link>
					<Typography variant="body1" color="textPrimary">
						Calendar
					</Typography>
				</Breadcrumbs>
			</Grid>
			<Grid item>
				<Button color="secondary" variant="contained" onClick={onEventAdd} className={classes.action}>
					<SvgIcon fontSize="small" className={classes.actionIcon}>
						<PlusCircleIcon />
					</SvgIcon>
					New Event
				</Button>
			</Grid>
		</Grid>
	);
}

Header.propTypes = {
	className: PropTypes.string,
  onEventAdd: PropTypes.func,
  backHandler:PropTypes.func.isRequired
};

Header.defaultProps = {
	onEventAdd: () => {}
};

export default Header;
