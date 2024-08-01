// Image.js
import React, { useMemo, useState, useRef, useEffect } from 'react';

import {Scalable, Pannable, Movable} from 'webrix/components';

//<div className='image' style={{flexBasis: `${size * 100}%`, backgroundImage: `url(${src})`}}/>

function Image({ className = "", size, src }) {

  const [scale, setScale] = useState(1);
  const {trackpad, update, transform} = Movable.Operations;
  const {map} = Movable.Transformers;

  const MIN = 0.75, MAX = 1.5;

  const Slider = ({left, value, onChange}) => {
      const movable = useRef();
      const position = `${map(MIN, MAX, 0, 90)(value)}%`; // 90 so the handle doesn't go beyond the track
      const props = Movable.useMove(useMemo(() => [
          trackpad(movable),
          transform(v => v.top, map(0, 100, MIN, MAX)),
          update(onChange),
      ], [onChange]));

      return (
        <Movable className='slider' ref={movable} {...props}>
          <div className='value'>{Math.round(value * 100)}%</div>
          <div className='handle' style={{top: position}}/>
        </Movable>
      );
  };
  
  return (
    <>
      <Pannable style={{flexBasis: `${size * 100}%`}} className={className}>
        <Scalable scalex={scale} scaley={scale}>
          <img className="image" style={{ backgroundImage: `url(${src})`}} src={src} />
        </Scalable>
        <Slider value={scale} onChange={setScale}/>
      </Pannable>
    </>
  );
}

export default Image;
