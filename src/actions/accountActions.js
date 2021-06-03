import axios from 'src/utils/axios';
import * as actionTypes from '../actionTypes';
export const SILENT_LOGIN = '@account/silent-login';
export const LOGOUT = '@account/logout';
export const UPDATE_PROFILE = '@account/update-profile';

export function login(data) {
  return (dispatch) =>
    axios
      .post(`${actionTypes.API_URL}/auth/login`, data)
      .then((res) => {
        const accessToken = res.data.auth_token;
        localStorage.setItem('access_token', accessToken);
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        const { user } = res.data;
        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          res: user
        });
      })
      .catch((err) => {
        const { error } = err.response.data;
        dispatch({
          type: actionTypes.LOGIN_FAILED,
          error
        });
        throw error;
      });
}

export function register(data) {
  return (dispatch) =>
    axios
      .post(`${actionTypes.API_URL}/auth/register`, data)
      .then((res) => {
        const accessToken = res.data.auth_token;
        localStorage.setItem('access_token', accessToken);
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        const { user } = res.data;
        dispatch({
          type: actionTypes.REGISTER_SUCCESS,
          res: user
        });
      })
      .catch((err) => {
        const { error } = err.response.data;
        dispatch({
          type: actionTypes.REGISTER_FAILED,
          error
        });
        throw error;
      });
}

export function logout() {
  return async (dispatch) => {
    localStorage.removeItem('access_token');

    dispatch({
      type: actionTypes.LOGOUT_REQUEST
    });
  };
}

export function getPendingAccounts(data) {
  return (dispatch) =>
    axios
      .get(`${actionTypes.API_URL}/auth/pending-accounts`, {
        params: data
      })
      .then((res) => {
        const records = res.data.pending_records;
        dispatch({
          type: actionTypes.GET_PENDING_ACCOUNTS_SUCCESS,
          res: records
        });
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.GET_PENDING_ACCOUNTS_FAILED,
          error
        });
      });
}

export function updateUserAccount(data) {
  return (dispatch) =>
    axios
      .post(`${actionTypes.API_URL}/auth/update-user-account`, data)
      .then((res) => {
        dispatch({
          type: actionTypes.UPDATE_USER_ACCOUNT_SUCCESS,
          res
        });
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.UPDATE_USER_ACCOUNT_FAILED,
          error
        });
      });
}

export function getAllUsers(data) {
  return (dispatch) =>
    axios
      .get(`${actionTypes.API_URL}/auth/get-all-users`, { params: data })
      .then((res) => {
        const { data } = res;
        dispatch({
          type: actionTypes.GET_ALL_USERS_SUCCESS,
          res: data
        });
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.GET_ALL_USERS_FAILED,
          error
        });
      });
}

export function deactivateUser(data) {
  return (dispatch) =>
    axios
      .post(`${actionTypes.API_URL}/auth/deactivate-user`, data)
      .then((res) => {
        dispatch({
          type: actionTypes.DEACTIVATE_USER_SUCCESS,
          res: res.data
        });
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.DEACTIVATE_USER_FAILED,
          error: error.response.data
        });
        throw error;
      });
}

export function updateBlockStatus(data) {
  return (dispatch) =>
    axios
      .post(`${actionTypes.API_URL}/auth/block-user`, data)
      .then((res) => {
        dispatch({
          type: actionTypes.UPDATE_BLOCK_STATUS_SUCCESS,
          res: res.data
        });
      })
      .catch((err) => {
        const error = err.response.data.data
          ? err.response.data.data
          : 'Unable to block/unblock the user!';
        dispatch({
          type: actionTypes.UPDATE_BLOCK_STATUS_FAILED,
          error: err.response.data
        });
        throw error;
      });
}

export function registerUserByAdmin(data) {
  return (dispatch) =>
    axios
      .post(`${actionTypes.API_URL}/auth/register-user-by-admin`, data)
      .then((res) => {
        dispatch({
          type: actionTypes.REGISTER_USER_BY_ADMIN_SUCCESS,
          res: res.data
        });
      })
      .catch((err) => {
        const error = err.response.data.data
          ? err.response.data.data
          : 'Unable to block/unblock the user!';
        dispatch({
          type: actionTypes.REGISTER_USER_BY_ADMIN_FAILED,
          error: err.response.data
        });
        throw error;
      });
}

export function setUserData(user) {
  return (dispatch) =>
    dispatch({
      type: SILENT_LOGIN,
      payload: {
        user
      }
    });
}

export function searchUser(data) {
  return (dispatch) =>
    axios
      .get(`${actionTypes.API_URL}/auth/search-user`, {
        params: data
      })
      .then((res) => {
        dispatch({
          type: actionTypes.SEARCH_USER_SUCCESS,
          res: res.data.users
        });
      });
}

export function updateMyPassword(newpass) {
  return (dispatch) =>
    axios
      .post(`${actionTypes.API_URL}/auth/update-my-password`, {
        password: newpass
      })
      .then((res) => {
        console.log('=====password updated=============', res);
      });
}

export function updateUserInfoByAdmin(data) {
  return (dispatch) =>
    axios
      .post(`${actionTypes.API_URL}/auth/update-user-info`, data)
      .then(() => {
        dispatch({
          type: actionTypes.UPDATE_USER_INFO_SUCCESS,
          res: data
        });
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.UPDATE_USER_INFO_FAILED,
          error
        });
        throw error;
      });
}

export function updateUserProfileByAdmin(data) {
  return (dispatch) => {
    return axios
      .post(`${actionTypes.API_URL}/update-user-profile`, data)
      .then(() => {
        dispatch({
          type: actionTypes.UPDATE_USER_PROFILE_SUCCESS,
          res: data
        });
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.UPDATE_USER_PROFILE_FAILED,
          error
        });
        throw error;
      });
  };
}
