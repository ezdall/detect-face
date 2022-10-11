import React from 'react';

export default function Navigation(props) {
  const { onRouteChange, route } = props;

  return (
    <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {route !== 'signin' && (
        // eslint-disable-next-line
        <p
          onClick={() => onRouteChange('signin')}
          className="f3 link dim black underline pa3 pointer"
        >
          Sign Out
        </p>
      )}
    </nav>
  );
}
