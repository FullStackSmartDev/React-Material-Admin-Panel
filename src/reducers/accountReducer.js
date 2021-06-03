/* eslint-disable no-param-reassign */
import produce from 'immer';
import * as actionTypes from '../actionTypes';

const initialState = {
  user: {},
  pendingAccounts: [],
  isUpdateAccount: false
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST: {
      return produce(state, (draft) => {
        draft.user.data = {};
        draft.user.error = '';
      });
    }
    case actionTypes.LOGIN_SUCCESS: {
      return produce(state, (draft) => {
        draft.user.data = action.res;
        draft.user.error = '';
      });
    }
    case actionTypes.LOGIN_FAILED: {
      return produce(state, (draft) => {
        draft.user.data = {};
        draft.user.error = action.error;
      });
    }
    case actionTypes.REGISTER_SUCCESS: {
      return produce(state, (draft) => {
        draft.user.data = action.res;
        draft.user.error = '';
      });
    }
    case actionTypes.REGISTER_FAILED: {
      return produce(state, (draft) => {
        draft.user.data = {};
        draft.user.error = action.error;
      });
    }
    case actionTypes.LOGOUT_REQUEST: {
      return produce(state, (draft) => {
        draft.user.data = {};
        draft.user.error = '';
      });
    }
    case actionTypes.GET_PENDING_ACCOUNTS_SUCCESS: {
      return produce(state, (draft) => {
        draft.pendingAccounts = action.res;
      });
    }
    case actionTypes.GET_PENDING_ACCOUNTS_FAILED: {
      return produce(state, (draft) => {
        draft.pendingAccounts = [];
      });
    }
    case actionTypes.UPDATE_USER_ACCOUNT_SUCCESS: {
      return produce(state, (draft) => {
        draft.isUpdateAccount = true;
      });
    }
    case actionTypes.UPDATE_USER_ACCOUNT_FAILED: {
      return produce(state, (draft) => {
        draft.isUpdateAccount = false;
      });
    }
    case actionTypes.UPDATE_USER_INFO_SUCCESS: {
      return produce(state, (draft) => {
        draft.userList.data = state.userList.data;
        draft.userList.data.forEach((user) => {
          if (user.id === parseInt(action.res.userId, 10)) {
            user.firstName = action.res.firstName;
            user.lastName = action.res.lastName;
            user.email = action.res.email;
            user.role = action.res.role;
          }
        });
      });
    }
    case actionTypes.UPDATE_USER_PROFILE_SUCCESS: {
      return produce(state, (draft) => {
        draft.userList.data = state.userList.data;
        draft.userList.data.forEach((user) => {
          if (user.id === parseInt(action.res.userId, 10)) {
            user.userProfile.gender = action.res.gender;
            user.userProfile.mobile = action.res.mobile;
            user.userProfile.profileImage = action.res.profileImage;
            user.userProfile.address = action.res.address;
            user.userProfile.state = action.res.state;
            user.userProfile.country = action.res.country;
          }
        });
      });
    }
    case actionTypes.GET_ALL_USERS_SUCCESS: {
      return produce(state, (draft) => {
        draft.userList = action.res;
        draft.userList.data.forEach((user) => {
          if (user.userProfile === null) {
            user.userProfile = {
              gender: null,
              mobile: null,
              profileImage: null,
              address: null,
              state: null,
              country: null
            };
          }
        });
      });
    }
    case actionTypes.GET_ALL_USERS_FAILED: {
      return produce(state, (draft) => {
        draft.userList = [];
      });
    }
    case actionTypes.DEACTIVATE_USER_SUCCESS: {
      return produce(state, (draft) => {
        draft.deactivateUserRes = action.res;
      });
    }
    case actionTypes.DEACTIVATE_USER_FAILED: {
      return produce(state, (draft) => {
        draft.deactivateUserRes = action.error;
      });
    }
    case actionTypes.UPDATE_BLOCK_STATUS_SUCCESS: {
      return produce(state, (draft) => {
        draft.updateBlockStatus = action.res;
      });
    }
    case actionTypes.UPDATE_BLOCK_STATUS_FAILED: {
      return produce(state, (draft) => {
        draft.updateBlockStatus = action.error;
      });
    }
    case actionTypes.REGISTER_USER_BY_ADMIN_SUCCESS: {
      return produce(state, (draft) => {
        draft.registerUserByAdmin = action.data;
      });
    }
    case actionTypes.REGISTER_USER_BY_ADMIN_FAILED: {
      return produce(state, (draft) => {
        draft.registerUserByAdmin = action.error;
      });
    }
    case actionTypes.SEARCH_USER_SUCCESS: {
      return produce(state, (draft) => {
        draft.userList.data = action.res;
      });
    }
    default: {
      return state;
    }
  }
};

export default accountReducer;
