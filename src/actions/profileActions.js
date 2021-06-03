import axios from 'src/utils/axios';
import * as actionTypes from '../actionTypes';

export function uploadProfileImage(data) {
  return (dispatch) => {
    const formData = new FormData();
    formData.append('image', data.image);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    return axios
      .post(`${actionTypes.API_URL}/upload-profile-image`, formData, config)
      .then((result) => {
        dispatch({
          type: actionTypes.UPLOAD_PROFILE_IMAGE_SUCCESS,
          res: result.data.profileImage
        });
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.UPLOAD_PROFILE_IMAGE_FAILED,
          error
        });
        throw error;
      });
  };
}

export function removeProfileImage() {
  return (dispatch) => {
    dispatch({
      type: actionTypes.REMOVE_PROFILE_IMAGE
    });
  };
}

export function getUserProfile() {
  return (dispatch) => {
    return axios
      .get(`${actionTypes.API_URL}/get-user-profile`)
      .then((result) => {
        dispatch({
          type: actionTypes.GET_USER_PROFILE_SUCCESS,
          res: result.data
        });
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.GET_USER_PROFILE_FAILED,
          res: error
        });
      });
  };
}

export function updateUserProfile(data) {
  return (dispatch) => {
    return axios
      .post(`${actionTypes.API_URL}/update-user-profile`, data)
      .then((result) => {
        dispatch({
          type: actionTypes.UPDATE_PROFILE_SUCCESS,
          res: result.data
        });
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.UPDATE_PROFILE_FAILED,
          error
        });
        throw error;
      });
  };
}

export function setTheme(data) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_THEME,
      data
    });
  };
}
