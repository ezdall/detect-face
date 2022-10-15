import React from 'react';


export default function Rank(props) {
  const { entries, name} = props

  return (
    <div>
      <div className="white f3">{name}, your entry count is:</div>
      <div className="white f1">#{entries}</div>
    </div>
  );
}
