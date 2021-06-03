import axios from 'src/utils/axios';
import * as actionTypes from '../actionTypes';

export function getTwilioToken() {
  const request = axios.get(`${actionTypes.API_URL}/agent/get-token`);

  return (dispatch) => {
    request.then((response) => dispatch({
      type: actionTypes.SET_TW_TOKEN,
      payload: response.data.token
    })).catch((e)=>dispatch({
         type: actionTypes.SET_TW_TOKEN,
         payload: null
    }))
    ;
  };
}

export function saveCallLog(data){
  const request = axios.post(`${actionTypes.API_URL}/agent/create-outgoing-call`, data);
  
  return (dispatch) =>{
    request.then(response=>{
      console.log("call log is saved==================", response);
    }).catch(e =>{
      console.log("call log is not saved==================", e);
    })
  }
}