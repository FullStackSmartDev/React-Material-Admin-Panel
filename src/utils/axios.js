import axios from 'axios';
import store from '../store';
// import * as actions from '../actions/accountActions';

const token = localStorage.getItem('access_token');
axios.defaults.headers.common.Authorization = `Bearer ${token}`;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response.status === 401) {
    //   console.log("error..",error)
    // //   store.dispatch(actions.authLogout());
    // }
    return Promise.reject(error);
  },
);

export default axios;
