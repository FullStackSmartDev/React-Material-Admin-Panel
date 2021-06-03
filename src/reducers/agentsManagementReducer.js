import * as actionTypes from '../actionTypes';

const initialState = {
  id: 0,
  fullName: '',
  position: '',
  teamLead: '',
  avatar: '',
  totalCalls: 0,
  totalCallsTime: '00:00:00',
  leadsToCustomers: '00:00',
  totalCallsCost: 0,
};
const agentsManagementReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case actionTypes.SET_SELECTED_AGENT_TO_DISPLAY:
      return {
        ...state,
        agent: action.payload
      };
    default:
      return {
        ...state,
        agent: state
      };
  }
};

export default agentsManagementReducer;
