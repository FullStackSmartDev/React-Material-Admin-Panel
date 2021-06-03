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
  Link,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  Search as SearchIcon
} from 'react-feather';
import { userRoles } from 'src/utils/data';

const useStyles = makeStyles(theme => ({
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
  approveBtn: {
    marginRight: theme.spacing(1)
  },
  noRecords:{
    textAlign:'right',
    margin:20
  }
}));

function Results({ className, accounts, updateStatus,pageChange,limitChange,page,limit, ...rest }) {
  const classes = useStyles();
  const [query, setQuery] = useState('');

  const updateUserStatus = (email, status) => {
    const data = {
      email: email,
      status: status === 'approve' ? true : false,
      verifiedBy: 'iliasvinin@gmail.com'
    };
    updateStatus(data);
  };
  const handlePageChange = (event, newPage) => {
    pageChange(newPage)
  };

  const handleLimitChange = event => {
    limitChange(event.target.value)
  };
  const handleQueryChange=(event)=>{
    setQuery(query)
  }

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
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accounts.length > 0 ? accounts.map((account, index) => {
                return (
                  <TableRow
                    hover
                    key={index + 1}
                  >
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Typography variant="body2" color="textSecondary">
                          {account.first_name + ' ' + account.last_name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{account.email}</TableCell>
                    <TableCell>
                      {userRoles.map(
                        role => role.value === account.role && role.label
                      )}
                    </TableCell>

                    <TableCell align="right">
                      <Button
                        color="secondary"
                        size="small"
                        type="submit"
                        variant="contained"
                        className={classes.approveBtn}
                        onClick={() =>
                          updateUserStatus(account.email, 'approve')
                        }
                      >
                        Approve
                      </Button>
                      <Button
                        size="small"
                        type="submit"
                        onClick={() =>
                          updateUserStatus(account.email, 'reject')
                        }
                      >
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              }) : <h3 className={classes.noRecords}>No Records Found!</h3>}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={accounts.length}
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
  updateStatus: PropTypes.func.isRequired,
  pageChange:PropTypes.func.isRequired,
  limitChange:PropTypes.func.isRequired
};

Results.defaultProps = {
  customers: []
};

export default Results;
