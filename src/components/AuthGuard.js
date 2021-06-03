import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

function AuthGuard({ children }) {
  const access_token=localStorage.getItem('access_token');
  if (!access_token) {
    return <Redirect to="/login" />;
  }

  return children;
}

AuthGuard.propTypes = {
  children: PropTypes.any
};

export default AuthGuard;
