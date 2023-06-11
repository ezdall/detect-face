import React from 'react';

// css
import './face-detect.css';

export default function FaceDetect(props) {
  const {
    imgUrl,
    box: { top, bottom, right, left }
  } = props;

  console.log({ top, bottom, right, left });

  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="inputimage"
          src={imgUrl}
          alt="face"
          width="600px"
          height="auto"
        />
        <div
          className="bounding-box"
          style={{
            top: `${top}%`,
            right: `${right}%`,
            bottom: `${bottom}%`,
            left: `${left}%`
          }}
        />
      </div>
    </div>
  );
}
