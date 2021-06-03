import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Container,
  Divider,
  Tab,
  Tabs,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import Profile from './Profile';
import User from './User';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function EditUserView({ match }) {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('user');
  const history = useHistory();

  const tabs = [
    { value: 'user', label: 'User' },
    { value: 'profile', label: 'Profile' }
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <Page className={classes.root} title="Settings">
      <Container maxWidth="lg">
        <Header backHandler={() => history.push('/app/manage-users')} />
        <Box mt={3}>
          <Tabs
            onChange={handleTabsChange}
            scrollButtons="auto"
            value={currentTab}
            variant="scrollable"
            textColor="secondary"
            className={classes.tabs}
          >
            {tabs.map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
        </Box>
        <Divider />
        <Box mt={3}>
          {currentTab === 'user' && <User userId={match.params.userId} />}
          {currentTab === 'profile' && <Profile userId={match.params.userId} />}
        </Box>
      </Container>
    </Page>
  );
}

EditUserView.propTypes = {
  match: PropTypes.object.isRequired
};

export default EditUserView;
