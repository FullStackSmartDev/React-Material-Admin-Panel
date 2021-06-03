import React from 'react';

function Logo(props) {
  return (
    <img
      alt="Logo"
      src="/static/biramedia-logo.png"
      {...props}
      style={{ width: 125, height: 'auto' }}
    />
  );
}

export default Logo;
