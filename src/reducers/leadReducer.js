/* eslint-disable no-param-reassign */
import produce from 'immer';
import * as actionTypes from '../actionTypes';

const initialState = {
  createLeadResponse: {},
  leads: [],
  failedLeads: [],
  isOngoingCall: false,
  selectedPhoneNumber: ''
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_LEAD_SUCCESS: {
      return produce(state, (draft) => {
        draft.createLeadResponse.data = action.data;
        draft.createLeadResponse.error = '';
      });
    }
    case actionTypes.CREATE_LEAD_FAILED: {
      return produce(state, (draft) => {
        draft.createLeadResponse.data = '';
        draft.createLeadResponse.error = action.error;
      });
    }
    case actionTypes.GET_LEAD_LIST_SUCCESS: {
      return produce(state, (draft) => {
        draft.leadList = action.res;
      });
    }
    case actionTypes.GET_LEAD_LIST_FAILED: {
      return produce(state, (draft) => {
        draft.leadList = [];
      });
    }
    case actionTypes.UPLOAD_BULK_LEAD_SUCCESS: {
      return produce(state, (draft) => {
        draft.failedLeads = [];
      });
    }
    case actionTypes.UPLOAD_BULK_LEAD_FAILED: {
      return produce(state, (draft) => {
        draft.failedLeads = action.error;
      });
    }
    case actionTypes.SEARCH_LEAD_SUCCESS: {
      return produce(state, (draft) => {
        draft.leadList = action.res;
      });
    }
    case actionTypes.GET_TWILIO_TOKEN_SUCCESS: {
      return produce(state, (draft) => {
        draft.twilioToken = action.res;
      });
    }
    case actionTypes.SET_ONGOING_CALL_STATUS: {
      return produce(state, (draft) => {
        draft.isOngoingCall = action.res.isOngoingCall;
        draft.selectedPhoneNumber = action.res.phoneNumber;
      });
    }
    case actionTypes.STORE_OUTGOING_CALL_SUCCESS: {
      return produce(state, (draft) => {
        draft.outgoingCallSuccess = action.res;
      });
    }
    case actionTypes.GET_LEAD_BY_ID_SUCCESS: {
      return produce(state, (draft) => {
        draft.leadByIdResponse = action.res;
      });
    }
    case actionTypes.GET_AGENT_CALL_DETAILS_SUCCESS: {
      return produce(state, (draft) => {
        draft.agentCallDetails = action.res;
      });
    }
    case actionTypes.UPDATE_CALL_STATUS_SUCCESS: {
      return produce(state, (draft) => {
        draft.updateCallStatus = action.res;
      });
    }
    case actionTypes.STORE_CURRENT_LEAD_ID: {
      return produce(state, (draft) => {
        draft.currentLeadId = action.res;
      });
    }
    case actionTypes.UPDATE_LEAD_COMMENTS: {
      return produce(state, (draft) => {
        draft.leadComments = action.res;
      });
    }
    default: {
      return state;
    }
  }
};

export default accountReducer;
