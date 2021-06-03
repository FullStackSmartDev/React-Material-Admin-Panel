import * as actionTypes from '../actionTypes';

const initialState = {
  lead: {
    id: 0,
    companyNumber: '',
    status: '',
    name: '',
    surname: '',
    industry: '',
    email: '',
    phoneNumber: '',
    address: '',
    bigCity: '',
    companyName: '',
    twitterUrl: '',
    facebookUrl: '',
    linkedInUrl: '',
    emailSent: false,
    smsSent: false
  }
};

const selectedLeadReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case actionTypes.SET_SELECTED_LEAD:
      console.log('SET_SELECTED_LEAD');
      console.log(action.payload);
      return {
        ...state,
        lead: action.payload
      };
    default:
      console.log('default');
      return {
        ...state,
        agent: state
      };
  }
};

export default selectedLeadReducer;
