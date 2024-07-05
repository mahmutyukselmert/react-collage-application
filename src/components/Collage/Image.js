// Image.js
import React from 'react';

function Image({ size, src }) {
  return (
    <div className='image' style={{flexBasis: `${size * 100}%`, backgroundImage: `url(${src})`}}/>
  );
}

export default Image;
