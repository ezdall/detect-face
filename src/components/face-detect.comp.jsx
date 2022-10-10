import React from 'react';

export default function FaceDetect(props) {
  const { imgSrc } = props;

  return (
    <div>
      <img src={imgSrc} alt="" />
    </div>
  );
}
