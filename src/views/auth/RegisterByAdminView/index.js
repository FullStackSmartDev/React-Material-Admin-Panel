import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import RegisterByAdminForm from './RegisterByAdminForm';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    minHeight: '100%',
    flexDirection: 'column',
    paddingBottom: 80,
    paddingTop: 80
  },
  account: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  }
}));

function RegisterByAdminView() {
  const classes = useStyles();
  const history = useHistory();

  const handleSubmitSuccess = () => {
    history.push('/app/pending-account-approval');
  };

  return (
    <Page className={classes.root} title="Register">
      <Container maxWidth="sm">
        <Box mb={5} display="flex" alignItems="center">
          <RouterLink to="/">{/* <Logo /> */}</RouterLink>
        </Box>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h2" color="textPrimary">
              Add new user
            </Typography>
            <Box mt={3}>
              <RegisterByAdminForm onSubmitSuccess={handleSubmitSuccess} />
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}

export default RegisterByAdminView;
