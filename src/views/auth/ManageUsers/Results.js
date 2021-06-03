/* eslint-disable max-len */
import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  InputAdornment,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  makeStyles,
  Chip,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  DialogContent
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { userRoles } from 'src/utils/data';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {},
  queryField: {
    width: 500
  },
  bulkOperations: {
    position: 'relative'
  },
  bulkActions: {
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 6,
    position: 'absolute',
    width: '100%',
    zIndex: 2,
    backgroundColor: theme.palette.background.default
  },
  bulkAction: {
    marginLeft: theme.spacing(2)
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1)
  },
  editBtn: {
    marginRight: theme.spacing(1)
  },
  approveBtn: {
    marginRight: theme.spacing(1)
  },
  headingText: {
    marginBottom: theme.spacing(2)
  },
  noRecords: {
    textAlign: 'right',
    margin: 20
  }
}));

function Results({
  className,
  userList,
  deactivateUser,
  updateUserBlockStatus,
  searchUser,
  ...rest
}) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState('');
  const [isDialogOpen, setDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [blockReason, setBlockReason] = useState('');
  const history = useHistory();

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handleQueryChange = (event) => {
    const { value } = event.target;
    setQuery(value);
    searchUser(value);
  };

  const editUserHandler = (userId) => {
    history.push(`/app/edit-user/${userId}`);
  };

  const deactivateUserHandler = (userEmail) => {
    deactivateUser(userEmail);
  };

  const handleChange = (e) => {
    setBlockReason(e.target.value);
  };

  const updateUserBlock = () => {
    const { email } = selectedUser;
    const blockStatus = !selectedUser.blockStatus;
    updateUserBlockStatus(email, blockStatus, blockReason);
    setDialog(false);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Box p={2} minHeight={56} display="flex" alignItems="center">
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon fontSize="small" color="action">
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>
            )
          }}
          onChange={handleQueryChange}
          placeholder="Search user"
          value={query}
          variant="outlined"
        />
      </Box>
      <PerfectScrollbar>
        <Box minWidth={700}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Block Status</TableCell>
                <TableCell>Block Reason</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList && userList.length > 0 ? (
                userList.map((user, index) => (
                  <TableRow hover key={index + 1}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Typography variant="body2" color="textSecondary">
                          {`${user.firstName} ${user.lastName}`}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {userRoles.map(
                        (role) => role.value === user.role && role.label
                      )}
                    </TableCell>
                    <TableCell>
                      {user.blockStatus ? (
                        <Chip label="Blocked" color="secondary" />
                      ) : (
                        <Chip label="Not Blocked" color="primary" />
                      )}
                    </TableCell>
                    <TableCell>
                      {user.blockReason ? user.blockReason : 'NA'}
                    </TableCell>

                    <TableCell align="right">
                      <Button
                        color="primary"
                        size="small"
                        type="submit"
                        variant="contained"
                        className={classes.editBtn}
                        onClick={() => editUserHandler(user.id)}
                      >
                        Edit user
                      </Button>
                      <Button
                        color="primary"
                        size="small"
                        type="submit"
                        variant="contained"
                        className={classes.approveBtn}
                        onClick={() => deactivateUserHandler(user.email)}
                      >
                        Deactivate user
                      </Button>
                      <Button
                        size="small"
                        type="submit"
                        variant="contained"
                        onClick={() => {
                          setDialog(true);
                          setSelectedUser(user);
                        }}
                      >
                        {user.blockStatus ? 'Unblock' : 'Block'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <h3 className={classes.noRecords}>No Records Found!</h3>
              )}
            </TableBody>
          </Table>
          <Dialog
            onClose={() => {
              setDialog(false);
            }}
            aria-labelledby="simple-dialog-title"
            open={isDialogOpen}
          >
            <DialogTitle id="simple-dialog-title">
              {`${selectedUser.blockStatus ? 'Unblock' : 'Block'} User`}
            </DialogTitle>
            <DialogContent>
              <Typography className={classes.headingText}>
                Are you sure want to{' '}
                {`${selectedUser.blockStatus ? 'Unblock' : 'Block'} ${
                  selectedUser.email
                }`}
              </Typography>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label={
                    selectedUser.blockStatus ? 'Unblock Reason' : 'Block Reason'
                  }
                  name="blockReason"
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={updateUserBlock}>
                OK
              </Button>
              <Button
                onClick={() => {
                  setDialog(false);
                }}
                color="primary"
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={userList ? userList.length : 0}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array,
  userList: PropTypes.array,
  updateUserBlockStatus: PropTypes.func.isRequired,
  deactivateUser: PropTypes.func.isRequired,
  searchUser: PropTypes.string.isRequired
};

Results.defaultProps = {
  customers: []
};

export default Results;
