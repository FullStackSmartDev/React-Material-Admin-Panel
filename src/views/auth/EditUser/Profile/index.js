import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { find } from 'lodash';
import { Grid, makeStyles } from '@material-ui/core';
import ProfileDetails from './ProfileDetails';
import ProfileSettings from './ProfileSetting';

const useStyles = makeStyles(() => ({
  root: {}
}));

function Profile({ userId, ...rest }) {
  const classes = useStyles();
  const userList = useSelector((state) => state.account.userList);
  const userInfo = find(userList.data, ['id', parseInt(userId, 10)]);

  return (
    <Grid className={clsx(classes.root)} container spacing={3} {...rest}>
      <Grid item lg={4} md={6} xl={3} xs={12}>
        <ProfileDetails user={userInfo} />
      </Grid>
      <Grid item lg={8} md={6} xl={9} xs={12}>
        <ProfileSettings user={userInfo} />
      </Grid>
    </Grid>
  );
}

Profile.propTypes = {
  userId: PropTypes.string
};

export default Profile;
