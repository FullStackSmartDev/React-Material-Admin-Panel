import React from 'react';
import { Card, CardContent, Typography,makeStyles,Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    root: {
      margin:theme.spacing(2)
    },
    element:{
        marginTop:theme.spacing(2),
    }
  }));

function LeadDetail({ leadDetails }) {
    const classes=useStyles();
	return (
		<React.Fragment>
			<Card className={classes.root}>
				<CardContent>
					<Typography gutterBottom variant="h4" color="textPrimary" align="center">
						Lead Details
					</Typography>
                    <Grid container className={classes.element}>
                        <Grid item xs={6}>
                            Name
                        </Grid>
                        <Grid item xs={6}>
                           {leadDetails && Object.keys(leadDetails).length > 0 ? `${leadDetails.firstName} ${leadDetails.lastName}` : 'NA'}
                        </Grid>
                    </Grid>
                    <Grid container className={classes.element}>
                        <Grid item xs={6}>
                            Email
                        </Grid>
                        <Grid item xs={6}>
                            {leadDetails && Object.keys(leadDetails).length > 0 ? leadDetails.email : 'NA'}
                        </Grid>
                    </Grid>
                    <Grid container className={classes.element}>
                        <Grid item xs={6}>
                            Gender
                        </Grid>
                        <Grid item xs={6}>
                            {leadDetails && Object.keys(leadDetails).length > 0 ? leadDetails.gender : 'NA'}
                        </Grid>
                    </Grid>
                    <Grid container className={classes.element}>
                        <Grid item xs={6}>
                            Industry
                        </Grid>
                        <Grid item xs={6}>
                           {leadDetails && Object.keys(leadDetails).length > 0 ? leadDetails.industry : 'NA'}
                        </Grid>
                    </Grid>
                    <Grid container className={classes.element}>
                        <Grid item xs={6}>
                            Country
                        </Grid>
                        <Grid item xs={6}>
                            {leadDetails && Object.keys(leadDetails).length > 0 ? leadDetails.country : 'NA'}
                        </Grid>
                    </Grid>
                    <Grid container className={classes.element}>
                        <Grid item xs={6}>
                            Company Name
                        </Grid>
                        <Grid item xs={6}>
                            {leadDetails && Object.keys(leadDetails).length > 0 && leadDetails.companyName ? leadDetails.companyName : 'NA'}
                        </Grid>
                    </Grid>
                    <Grid container className={classes.element}>
                        <Grid item xs={6}>
                            Company Email
                        </Grid>
                        <Grid item xs={6}>
                            {leadDetails && Object.keys(leadDetails).length > 0 && leadDetails.companyEmail  ? leadDetails.companyEmail : 'NA'}
                        </Grid>
                    </Grid>
                    <Grid container className={classes.element}>
                        <Grid item xs={6}>
                            Current Lead Status
                        </Grid>
                        <Grid item xs={6}>
                            {leadDetails && Object.keys(leadDetails).length > 0 && leadDetails.currentLeadStatus  ? leadDetails.currentLeadStatus : 'pending'}
                        </Grid>
                    </Grid>
                    <Grid container className={classes.element}>
                        <Grid item xs={6}>
                        Last Remarks
                        </Grid>
                        <Grid item xs={6}>
                            {leadDetails && Object.keys(leadDetails).length > 0 && leadDetails.lastRemark  ? leadDetails.lastRemark : 'NA'}
                        </Grid>
                    </Grid>
				</CardContent>
			</Card>
		</React.Fragment>
	);
}
LeadDetail.propTypes = {
	leadDetails: PropTypes.object
};

export default LeadDetail;
