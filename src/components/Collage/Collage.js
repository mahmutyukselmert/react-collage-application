import React, {useCallback, useState, useRef} from 'react';
import cls from 'classnames';
import {Movable} from 'webrix/components';

import Resizer from './Resizer';

const clamp = (min, max, value) => Math.max(min, Math.min(max, value));

const Collage = ({ children, size, orientation }) => {
  const [sizes, setSizes] = useState(React.Children.map(children, child => child.props.size));
  const ref = useRef();

  const handleOnResize = (position) => {
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const offset = orientation === 'row' ? left : top;
    const length = orientation === 'row' ? width : height;
    const sizepx = clamp(50, length - 50, position - offset);
    const size = sizepx / length;
    setSizes([size, 1 - size]);
  };

  let collage_class = null;
  if(orientation == "row") {
    collage_class = "half-window";
  } else {
    collage_class = "full-window";
  }

  return (
    <div className={cls('collage', collage_class)} style={{ flexDirection: orientation, flexBasis: `${size * 100}%` }} ref={ref}>
      {React.Children.map(children, (child, i) => (
        <>
          {i > 0 && <Resizer orientation={orientation} onResize={handleOnResize} />}
          {React.cloneElement(child, { size: sizes[i] })}
        </>
      ))}
    </div>
  );
};

export default Collage;
