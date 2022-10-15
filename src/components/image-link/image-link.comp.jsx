import React from 'react';
import './image-link.css';

export default function ImageLink({ onInputChange, onSubmitLink, input }) {
  return (
    <div>
      <p className="f3">This app will detect face in a picture</p>

      <div className="center">
        <div className="css-pattern center pa4 br3 shadow-5" >
          <input
            className="f4 pa2 w-70 center"
            type="text"
            name="text"
            placeholder="Enter image link/source"
            onChange={onInputChange}
            value={input}
            onKeyDown={(ev) => {
              if(ev.key !== 'Enter'){
                return null;
              }
              console.log('trigger')
              return onSubmitLink(ev);
            }}
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
