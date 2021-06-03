import * as actionTypes from '../actionTypes';

export const setSelectedAgentToDisplay = (agentObj) => {
  return {
    type: actionTypes.SET_SELECTED_AGENT_TO_DISPLAY,
    payload: agentObj
  };
};
