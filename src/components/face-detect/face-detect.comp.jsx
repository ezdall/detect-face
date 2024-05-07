import React from 'react';

// css
import './face-detect.css';

export default function FaceDetect(props) {
  const {
    imgUrl,
    onImageError,
    onImageLoad,
    box: { top, bottom, right, left },
    boxes
  } = props;

  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="inputimage"
          src={imgUrl}
          alt="face"
          width="600px"
          height="auto"
          onError={onImageError}
          onLoad={onImageLoad}
        />
        {boxes.map(bx => {
          return (
            <div
              key={bx.id}
              className="bounding-box"
              style={{
                top: `${bx.top}%`,
                right: `${bx.right}%`,
                bottom: `${bx.bottom}%`,
                left: `${bx.left}%`
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
