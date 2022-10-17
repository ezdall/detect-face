import React from 'react';
import './image-link.css';

export default function ImageLink(props) {
  const { onInputChange, onSubmitLink, input } = props;

  return (
    <div>
      <p className="f3">This app will detect faces in the picture</p>

      <div className="center">
        <div className="css-pattern center pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            name="text"
            placeholder="Enter image link/source"
            onChange={onInputChange}
            value={input}
            onKeyDown={ev => ev.key === 'Enter' && onSubmitLink(ev)}
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
