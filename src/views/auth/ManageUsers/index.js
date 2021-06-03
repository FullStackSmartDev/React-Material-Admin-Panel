import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Box, Container, makeStyles } from '@material-ui/core';
import { get } from 'lodash';
import Page from 'src/components/Page';
import {
  getAllUsers,
  deactivateUser,
  updateBlockStatus,
  searchUser
} from 'src/actions/accountActions';
import Header from './Header';
import Results from './Results';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function ManageUsers(props) {
  const classes = useStyles();

  const user = useSelector((state) => state.account.user);
  const userList = useSelector((state) => state.account.userList);
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const currentLeadId = useSelector((state) => state.leads.currentLeadId);

  let userInfo = {};
  if (user && Object.keys(user).length > 0) {
    userInfo = get(user, 'data', {});
  }

  const deactivateUserHandler = async (userEmail) => {
    const data = {
      email: userEmail,
      role: userInfo.role ? userInfo.role : ''
    };

    try {
      await dispatch(deactivateUser(data));
      enqueueSnackbar('User Deactivated Successfully!', {
        variant: 'success'
      });
      dispatch(getAllUsers({ role: userInfo.role }));
    } catch (err) {
      const error = err || 'Unable to deactivate the user!';
      enqueueSnackbar(error, {
        variant: 'error'
      });
    }
  };

  const updateUserBlockStatusHandler = async (
    email,
    blockStatus,
    blockReason
  ) => {
    const data = {
      role: userInfo.role ? userInfo.role : '',
      email,
      blockStatus,
      blockReason
    };

    try {
      await dispatch(updateBlockStatus(data));
      enqueueSnackbar('User Status Updated Successfully!', {
        variant: 'success'
      });
      dispatch(getAllUsers({ role: userInfo.role }));
    } catch (err) {
      const error = err || 'Unable to update the status!';
      enqueueSnackbar(error, {
        variant: 'error'
      });
    }
  };

  const searchUserHandler = async (value) => {
    const data = {
      searchQuery: value
    };
    await dispatch(searchUser(data));
  };

  const backHandler = () => {
    props.history.push(`/app/management/leads/call/${currentLeadId}`);
  };

  useEffect(() => {
    const data = {
      role: userInfo.role ? userInfo.role : ''
    };
    dispatch(getAllUsers(data));
  }, []);

  return (
    <Page className={classes.root} title="Customer List">
      <Container maxWidth={false}>
        <Header backHandler={backHandler} />
        {userList && (
          <Box mt={3}>
            <Results
              userList={userList.data}
              deactivateUser={deactivateUserHandler}
              updateUserBlockStatus={updateUserBlockStatusHandler}
              searchUser={searchUserHandler}
            />
          </Box>
        )}
      </Container>
    </Page>
  );
}

export default ManageUsers;
