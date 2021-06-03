import React from 'react';
import { useSelector } from 'react-redux';
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import LeadsCreateForm from './LeadsCreateForm';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function LeadsCreateView(props) {
  const classes = useStyles();
	const currentLeadId=useSelector(state=>state.leads.currentLeadId)

  const backHandler=()=>{
		props.history.push(`/app/management/leads/call/${currentLeadId}`)
	}
  return (
    <Page
      className={classes.root}
      title="Leads Create"
    >
      <Container maxWidth={false}>
        <Header
        backHandler={backHandler}
        />
        <LeadsCreateForm />
      </Container>
    </Page>
  );
}

export default LeadsCreateView;
