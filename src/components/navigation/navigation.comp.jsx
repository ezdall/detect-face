import React from 'react';

export default function Navigation(props) {
  const { onRouteChange, route } = props;

  return (
    <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {/* eslint-disable-next-line  */}
      {route === 'home' ? ( // eslint-disable-next-line
        <p
          onClick={() => onRouteChange('signin')}
          className="f3 link dim black underline pa3 pointer"
        >
          Sign Out
        </p>
      ) : route === 'register' ? ( // eslint-disable-next-line
        <p
          onClick={() => onRouteChange('signin')}
          className="f3 link dim black underline pa3 pointer"
        >
          Sign In
        </p>
      ) : (
        // eslint-disable-next-line
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
