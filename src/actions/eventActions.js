import axios from 'src/utils/axios';
import moment from 'moment';
import * as actionTypes from '../actionTypes';

export function createEvent(data) {
    return (dispatch) => {
      return  axios
        .post(`${actionTypes.API_URL}/create-event`, data)
        .then(result => {
          dispatch({
            type: actionTypes.CREATE_EVENT_SUCCESS,
            res:result.data
          });
        })
        .catch(err => {
            const { error } = err.response.data;
            dispatch({
            type: actionTypes.CREATE_EVENT_FAILED,
            error
          });
          throw error;
        });
    };
  }
  export function getEventList(data) {
    return (dispatch) => {
      return  axios
        .post(`${actionTypes.API_URL}/get-event-list`, data)
        .then(result => {
          let res=[]

          let events=result.data.events

          if(events && events.length > 0){
            events.map(event=>{
              res.push({
                id:event.id,
                title:event.title,
                description:event.description,
                start:parseInt(moment(event.startTime,"YYYY-MM-DD hh:mm:ss").format('x')),
                end:parseInt(moment(event.endTime,"YYYY-MM-DD hh:mm:ss").format('x')),
                allDay:false
              })
            })
          }
          dispatch({
            type: actionTypes.GET_EVENT_LIST_SUCCESS,
            res:res
          });
        })
        .catch(err => {
            const { error } = err.response.data;
            dispatch({
            type: actionTypes.GET_EVENT_LIST_FAILED,
            error
          });
          throw error;
        });
    };
  }
  export function updateEvent(data) {
    return (dispatch) => {
      return  axios
        .post(`${actionTypes.API_URL}/update-event`, data)
        .then(result => {
          dispatch({
            type: actionTypes.UPDATE_EVENT_SUCCESS,
            res:result.data
          });
        })
        .catch(err => {
            const { error } = err.response.data;
            dispatch({
            type: actionTypes.UPDATE_EVENT_FAILED,
            error
          });
          throw error;
        });
    };
  }
  export function deleteEventRequest(eventId) {
    // return (dispatch) => {
    //   return  axios
    //     .post(`${actionTypes.API_URL}/delete-event`, data)
    //     .then(result => {
    //       dispatch({
    //         type: actionTypes.UPDATE_EVENT_SUCCESS,
    //         res:result.data
    //       });
    //     })
    //     .catch(err => {
    //         const { error } = err.response.data;
    //         dispatch({
    //         type: actionTypes.UPDATE_EVENT_FAILED,
    //         error
    //       });
    //       throw error;
    //     });
    // };
  }


  
  

  