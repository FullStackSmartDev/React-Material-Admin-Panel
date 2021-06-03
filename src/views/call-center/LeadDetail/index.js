import React from 'react';
import {
  Box, makeStyles, Link, TextField, useTheme, Divider
} from '@material-ui/core';
import {useSelector} from 'react-redux';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  textArea: {
    width: '100%',
    marginTop: theme.spacing(2)
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    background: '#4caf50',
    padding: theme.spacing(1),
    margin: 'auto'
  },
  boxStyle: {
    color: theme.palette.text.primary,
    borderBottom: `1px solid ${theme.palette.background.dark}`,
    marginTop: 5,
    paddingBottom: 5
  }
}));

const statuses = ['open', 'closed', 'sold'];
function LeadDetail() {
  const theme = useTheme();
  const classes = useStyles(theme);

  const selectedLead = useSelector((state) => state.selectedLead);

  return (
    <>
      <Box className={classes.root}>
        <Box>
          <Box className={classes.boxStyle}>
            {`Name : ${selectedLead.lead.name}`}
          </Box>
          <Divider />
          <Box className={classes.boxStyle}>
            {`Surname : ${selectedLead.lead.surname}`}
          </Box>
          <Divider />
          <Box className={classes.boxStyle}>
            {`Industry : ${selectedLead.lead.industry}`}
          </Box>
          <Divider />
          <Box className={classes.boxStyle}>
            {`Email : ${selectedLead.lead.email}`}
          </Box>
          <Divider />
          <Box className={classes.boxStyle}>
            {`Company Number : ${selectedLead.lead.companyNumber}`}
          </Box>
          <Divider />
          <Box className={classes.boxStyle}>
            {`Phone Number : ${selectedLead.lead.phoneNumber}`}
          </Box>
          <Divider />
          <Box className={classes.boxStyle}>
            {`Address : ${selectedLead.lead.address}`}
          </Box>
          <Divider />
          <Box className={classes.boxStyle}>
            {`Big City : ${selectedLead.lead.bigCity}`}
          </Box>
          <Divider />
          <Box className={classes.boxStyle}>
            {`Company : ${selectedLead.lead.companyName}`}
          </Box>
          <Divider />
          <Box className={classes.boxStyle}>
            Product Link :
            {selectedLead.lead.industry ? (
              <Link href={`http://biramedia.com/client/${selectedLead.lead.id}/${selectedLead.lead.industry}/`} target="_blank">View the product</Link>
            ) : ''}
          </Box>
          <Divider />
          <Box className={classes.boxStyle}>
            Twitter URl :
            {selectedLead.lead.twitterUrl ? <Link href={selectedLead.lead.twitterUrl} target="_blank">www.twitter.com</Link> : ''}
          </Box>
          <Divider />
          <Box className={classes.boxStyle}>
            Facebook Url :
            {selectedLead.lead.facebookUrl ? <Link href={selectedLead.lead.facebookUrl} target="_blank">www.facebook.com</Link> : ''}
          </Box>
          <Divider />
          <Box className={classes.boxStyle}>
            Linked In Url :
            {selectedLead.lead.linkedInUrl ? <Link href={selectedLead.lead.linkedInUrl} target="_blank">www.linkedin.com</Link> : ''}
          </Box>
        </Box>
      </Box>
      <Box m={2} className={classes.root}>
        <TextField
          fullWidth
          label="Select Status"
          name="state"
          select
          SelectProps={{ native: true }}
          value={selectedLead.lead.status}
          variant="outlined"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </TextField>
        <TextField
          label="Note"
          multiline
          rows={4}
          variant="outlined"
          value={selectedLead.lead.note}
          className={classes.textArea}
        />
        <Box className={classes.icon} display="flex" justifyContent="center">
          <SystemUpdateAltIcon style={{ color: 'white' }} />
        </Box>
      </Box>
    </>
  );
}
export default LeadDetail;
