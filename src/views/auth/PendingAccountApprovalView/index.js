import React, {
    useState,
    useEffect,
    useCallback
  } from 'react';
  import { connect } from "react-redux";
  import { shallowEqual, useSelector } from 'react-redux';
  import {
    Box,
    Container,
    makeStyles
  } from '@material-ui/core';
  import axios from 'src/utils/axios';
  import Page from 'src/components/Page';
  import useIsMountedRef from 'src/hooks/useIsMountedRef';
  import Header from './Header';
  import { getPendingAccounts,updateUserAccount } from 'src/actions/accountActions';
import Results from './Results';
  
  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3)
    }
  }));
  
  function PendingAccountApprovalView({getPendingAccounts,updateAccount}) {
    const classes = useStyles();
    const isMountedRef = useIsMountedRef();

    const [page,setPage]=useState(0);
    const [limit,setLimit]=useState(10)
  
    useEffect(() => {
      getAccounts();
    }, [getAccounts]);

    const  pendingAccounts  = useSelector(state => ({
        data: state.account.pendingAccounts,
      }), shallowEqual);

    const getAccounts = useCallback(() => {
      const data={
        pageNumber:page,
        pageLimit:limit
      }
        getPendingAccounts(data)
    },[isMountedRef])

  
    const updateStatusHandler=async(data)=>{
        await updateAccount(data);
        await getPendingAccounts()
    }
    const changePageHandler=(page)=>{
      setPage(page)
    }
    const changeLimitHandler=limit=>{
      setLimit(limit)
    } 
    return (
      <Page
        className={classes.root}
        title="Customer List"
      >
        <Container maxWidth={false}>
          <Header />
             <Box mt={3}>
               <Results accounts={pendingAccounts.data}
               updateStatus={updateStatusHandler}
               pageChange={changePageHandler}
               limitChange={changeLimitHandler}
               page={page}
               limit={limit}
               />
             </Box>
        </Container>
      </Page>
    );
  }

  const mapDispatchToProps = dispatch => ({
    getPendingAccounts: (data) => dispatch(getPendingAccounts(data)),
    updateAccount: (data) => dispatch(updateUserAccount(data)),

    
  });
  
  export default connect(null,mapDispatchToProps)(PendingAccountApprovalView);
  
  