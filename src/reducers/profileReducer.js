/* eslint-disable no-param-reassign */
import produce from 'immer';
import * as actionTypes from '../actionTypes';

const initialState = {
  userProfile: {
    profileImage: '',
    isImageAdded: false
  },
  updateProfile: '',
  userProfile: {},
  theme: 'ONE_DARK'
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPLOAD_PROFILE_IMAGE_SUCCESS: {
      return produce(state, (draft) => {
        draft.userProfile.profileImage = action.res;
        draft.userProfile.isImageAdded = true;
      });
    }
    case actionTypes.UPLOAD_PROFILE_IMAGE_FAILED: {
      return produce(state, (draft) => {
        draft.userProfile.profileImage = '';
        draft.userProfile.isImageAdded = true;
      });
    }
    case actionTypes.REMOVE_PROFILE_IMAGE: {
      return produce(state, (draft) => {
        draft.userProfile.profileImage = '';
        draft.userProfile.isImageAdded = false;
      });
    }
    case actionTypes.UPDATE_PROFILE_SUCCESS: {
      return produce(state, (draft) => {
        draft.updateProfile = action.res;
      });
    }
    case actionTypes.UPDATE_PROFILE_FAILED: {
      return produce(state, (draft) => {
        draft.updateProfile = '';
      });
    }
    case actionTypes.GET_USER_PROFILE_SUCCESS: {
      return produce(state, (draft) => {
        draft.userProfile = action.res.profile;
      });
    }
    case actionTypes.GET_USER_PROFILE_FAILED: {
      return produce(state, (draft) => {
        draft.userProfile = {};
      });
    }
    case actionTypes.SET_THEME: {
      return produce(state, (draft) => {
        draft.theme = action.data;
      });
    }

    default: {
      return state;
    }
  }
};

export default profileReducer;
