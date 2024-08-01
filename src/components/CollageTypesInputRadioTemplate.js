import React, { useState } from "react";

function CollageTypesInputRadioTemplate({ id, value, collageType, setCollageType, handleContinue, children }) {
  
  const handleCollageTypeRadio = (event) => {
    setCollageType(event.target.value);
  };
  
  return (
    <div className="col-6 col-md-4 col-lg-4 col-xl-2 mb-3">
      <div className="w-auto">
        <label className="form-check-label d-block" htmlFor={id} >
          {children}
        </label>
        <input
          type="radio"
          className="form-check-input mx-auto d-flex mb-2"
          id={id}
          name="collage_type"
          value={value}
          checked={collageType === value}
          onChange={handleCollageTypeRadio}
        />
      </div>
    </div>
  );
}

export default CollageTypesInputRadioTemplate;
