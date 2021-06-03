import axios from 'src/utils/axios';
import * as actionTypes from '../actionTypes';

export function createLead(data) {
  return dispatch => {
    return axios
      .post(`${actionTypes.API_URL}/lead/create`, data)
      .then((res) => {
        dispatch({
          type: actionTypes.CREATE_LEAD_SUCCESS,
          res: res.data
        });
      })
      .catch(err => {
        const  {error}  = err.response.data;
        dispatch({
          type: actionTypes.CREATE_LEAD_FAILED,
          error
        });
        throw error;
      });
  };
}


export function getLeadList(data) {
    return dispatch => {
      return axios
        .get(`${actionTypes.API_URL}/lead/list`,{
            params:data
        })
        .then((res) => {
          dispatch({
            type: actionTypes.GET_LEAD_LIST_SUCCESS,
            res: res.data.leads
          });
        })
        .catch(err => {
          const  {error}  = err.response.data;
          dispatch({
            type: actionTypes.GET_LEAD_LIST_FAILED,
            error
          });
          throw error;
        });
    };
  }

  export function uploadBulkLead(file) {
    return dispatch => {
      const formData = new FormData();
      formData.append('file', file);
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      return axios
        .post(`${actionTypes.API_URL}/lead/bulk-upload`, formData, config)
        .then(() => {
          dispatch({
            type: actionTypes.UPLOAD_BULK_LEAD_SUCCESS
          });
        })
        .catch(err => {
          const  {error}  = err.response.data;
          dispatch({
            type: actionTypes.UPLOAD_BULK_LEAD_FAILED,
            error
          });
          throw error;
        });
    };
  }
  export function searchLead(data){
    return dispatch => {
      return axios
        .get(`${actionTypes.API_URL}/lead/search`,{
            params:data
        })
        .then((res) => {
          dispatch({
            type: actionTypes.SEARCH_LEAD_SUCCESS,
            res: res.data.leads
          });
        })
    };
  }
  export function callLead(data){
    return dispatch => {
      return axios
        .post(`${actionTypes.API_URL}/lead/call`,data)
        .then((res) => {
          // dispatch({
          //   type: actionTypes.SEARCH_LEAD_SUCCESS,
          //   res: res.data.leads
          // });
        })
        .catch(error=>{
          console.log('error>>',error)
        })
    };
  }
  export function getToken(){
    return dispatch => {
      return axios
        .get(`${actionTypes.API_URL}/lead/get-token`)
        .then((res) => {
          dispatch({
            type: actionTypes.GET_TWILIO_TOKEN_SUCCESS,
            res: res.data.token
          });
        })
        .catch(error=>{
          throw error;
        })
    };
  }
  export function setOngoingCall(data){
    return dispatch => {
      dispatch({
        type:actionTypes.SET_ONGOING_CALL_STATUS,
        res:data
      })
    };
  }
  export function storeOutgoingCallDetails(data){
    return dispatch => {
      return axios
        .post(`${actionTypes.API_URL}/agent/create-outgoing-call`,data)
        .then((res) => {
          dispatch({
            type: actionTypes.STORE_OUTGOING_CALL_SUCCESS,
            res: res.data
          });
        })
    };
  }
  export function getLeadById(data){
    return dispatch=>{
      return axios.get(`${actionTypes.API_URL}/get-lead-by-id`,{
        params:data
      })
      .then((res)=>{
        dispatch({
          type: actionTypes.GET_LEAD_BY_ID_SUCCESS,
          res: res.data
        });
      })
      .catch((err)=>{
        const  {error}  = err.response.data;
        throw error;
      })
    }
  }
  export function agentCallDetails(data){
    return dispatch=>{
      return axios.get(`${actionTypes.API_URL}/agent/get-previous-call-details`,{
        params:data
      })
      .then((res)=>{
        dispatch({
          type: actionTypes.GET_AGENT_CALL_DETAILS_SUCCESS,
          res: res.data
        });
      })
    }
  }

  export function updateCallStatus(data){
    return dispatch=>{
      return axios.post(`${actionTypes.API_URL}/agent/update-call-details`,data)
      .then((res)=>{
        dispatch({
          type: actionTypes.UPDATE_CALL_STATUS_SUCCESS,
          res: res.data
        });
      })
      .catch(err=>{
        const  {error}  = err.response.data;
        throw error;
      })
    }
  }
  export function storeCurrentLead(leadId){
    return dispatch=>{
      return dispatch({
        type:actionTypes.STORE_CURRENT_LEAD_ID,
        res:leadId
      })
    }
  }

  export function addLeadComment(data){
    return dispatch=>{
      return axios.post(`${actionTypes.API_URL}/agent/add-lead-comments`,data)
      .then((res)=>{
        dispatch({
          type: actionTypes.UPDATE_LEAD_COMMENTS,
          res: res.data
        });
      })
      .catch(err=>{
        const  {error}  = err.response.data;
        throw error;
      })
    }
  }
  


  
  