import * as actionTypes from '../actionTypes';

export function setSelectedLeadToDisplay(leadObj) {
  return {
    type: actionTypes.SET_SELECTED_LEAD,
    payload: leadObj
  };
}
