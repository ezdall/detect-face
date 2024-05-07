import React from 'react';

export default function Navigation(props) {
  const { onRouteChange, route } = props;

  return (
    <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {/* eslint-disable  */}
      {route === 'home' ? (
        <p
          onClick={() => onRouteChange('signout')}
          className="f3 link dim black underline pa3 pointer"
        >
          Sign Out
        </p>
      ) : route === 'register' ? (
        <p
          onClick={() => onRouteChange('signin')}
          className="f3 link dim black underline pa3 pointer"
        >
          Sign In
        </p>
      ) : (
        <p
          onClick={() => onRouteChange('register')}
          className="f3 link dim black underline pa3 pointer"
        >
          Register
        </p>
      )}
    </nav>
  );
}
