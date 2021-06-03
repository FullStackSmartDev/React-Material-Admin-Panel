import * as actionTypes from '../actionTypes';

const initialState = {
    status : null,
    token: null
};

const dialReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case actionTypes.SET_TW_TOKEN:
      console.log('SET_TW_TOKEN');
      console.log(action.payload);
      return {
        ...state,
        token: action.payload
      };
    case actionTypes.SET_DIAL_STATUS:
        return {
            ...state,
            status: action.payload
        }
    default:
        return state;    
  }
};

export default dialReducer;
