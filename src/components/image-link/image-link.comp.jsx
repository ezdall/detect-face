import React from 'react';
import './image-link.css';

export default function ImageLink({ onInputChange, onSubmitLink, input }) {
  return (
    <div>
      <p className="f3">This app will detect faces in a picture</p>

      <div className="center">
        <div className="center form pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            name="text"
            onChange={onInputChange}
            value={input}
          />
          <button
            type="button"
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={onSubmitLink}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
}