/* eslint-disable no-param-reassign */
import produce from 'immer';
import * as actionTypes from '../actionTypes'

const initialState = {
    createEventResponse:{},
    eventList:[]
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_EVENT_SUCCESS: {
      return produce(state, (draft) => {
        draft.createEventResponse.data = action.res;
        draft.createEventResponse.error = '';
      });
    }

    case actionTypes.CREATE_EVENT_FAILED: {
        return produce(state, (draft) => {
          draft.createEventResponse.data = '';
          draft.createEventResponse.error = action.error;
        });
    }

    case actionTypes.GET_EVENT_LIST_SUCCESS:{
        return produce(state, (draft) => {
            draft.eventList = action.res;
          });
    }

    case actionTypes.GET_EVENT_LIST_FAILED:{
        return produce(state, (draft) => {
            draft.eventList = [];
        });
    }

    case actionTypes.UPDATE_EVENT_SUCCESS:{
      return produce(state, (draft) => {
        draft.eventList = [];
    });
    }
   
    default: {
      return state;
    }
  }
};

export default profileReducer;
