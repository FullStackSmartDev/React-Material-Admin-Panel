import React, { useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Breadcrumbs, Grid, Link, Typography, makeStyles, SvgIcon, Button } from '@material-ui/core';
import { CSVLink } from 'react-csv';
import { useSnackbar } from 'notistack';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { PlusCircle as PlusCircleIcon } from 'react-feather';
import { useDispatch } from 'react-redux';
import { uploadBulkLead } from 'src/actions/leadActions';
import { sampleCsvData } from 'src/utils/data';

const useStyles = makeStyles((theme) => ({
	root: {},
	headingText: {
		marginTop: theme.spacing(1)
	},
	actionIcon: {
		marginRight: theme.spacing(1)
	},
	fileUpload: {
		display: 'none'
	},
	sampleCsv: {
		marginTop: theme.spacing(1)
	},
	backBtn:{
		marginBottom:theme.spacing(2)
	  }
}));

function Header({ className,backHandler, fetchLeads, ...rest }) {
	const classes = useStyles();
	const uploadRef = useRef(null);
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();

	const handleFileChange = async (event) => {
		let file = event.target.files[0];

		try {
			await dispatch(uploadBulkLead(file));
			await fetchLeads();
			enqueueSnackbar('Lead Uploaded Successfully!', {
				variant: 'success'
			});
		} catch (error) {
			await fetchLeads();
			enqueueSnackbar('Upload Failed for some leads', {
				variant: 'error'
			});
		}
	};
	return (
		<Grid className={clsx(classes.root, className)} container justify="space-between" spacing={3} {...rest}>
			<Grid item>
				<Button
					color="secondary"
					variant="outlined"
					size="medium"
					onClick={backHandler}
					className={classes.backBtn}
				>
					Back
				</Button>
				<Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
					<Link variant="body1" color="inherit" to="/app" component={RouterLink}>
						Dashboard
					</Link>
					<Typography variant="body1" color="textPrimary">
						List Leads
					</Typography>
				</Breadcrumbs>
				<Typography variant="h3" color="textPrimary" className={classes.headingText}>
					All Leads
				</Typography>
			</Grid>
			<Grid item>
				<input
					type="file"
					ref={uploadRef}
					accept=".csv"
					className={classes.fileUpload}
					onChange={handleFileChange}
				/>
				<Button
					color="secondary"
					variant="contained"
					className={classes.action}
					onClick={() => uploadRef.current.click()}
				>
					<SvgIcon fontSize="small" className={classes.actionIcon}>
						<PlusCircleIcon />
					</SvgIcon>
					Upload Lead CSV
				</Button>
				<div className={classes.sampleCsv}>
					<CSVLink data={sampleCsvData} filename={'sample-lead'}>
						<Button icon="download" style={{ marginLeft: 10 }}>
							Sample CSV
						</Button>
					</CSVLink>
				</div>
			</Grid>
		</Grid>
	);
}

Header.propTypes = {
	className: PropTypes.string,
	fetchLeads: PropTypes.func.isRequired,
	backHandler:PropTypes.func.isRequired
};

export default Header;
