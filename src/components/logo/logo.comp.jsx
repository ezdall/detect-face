import React from 'react';
import Tilt from 'react-tilt';

import './logo.css';
import LogoImg from './ai-logo.png';

export default function Logo() {
  return (
    <div className="ma4 mt0">
      <Tilt
        className="Tilt br3 shadow-2 flex justify-center  items-center  flex-column"
        options={{ max: 55 }}
        style={{ height: 150, width: 150 }}
      >
        <div className="Tilt-inner">
          <img className="" src={LogoImg} alt="logo" />
        </div>
      </Tilt>
    </div>
  );
}
