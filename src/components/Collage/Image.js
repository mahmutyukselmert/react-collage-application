import React, { useMemo, useState, useRef, useEffect, useCallback } from 'react';
import { Scalable, Pannable } from 'webrix/components';

function Image({ className = "", size, src, scale, setScale, index, selectedIndex, handleImageClick }) {
  const [isPanning, setIsPanning] = useState(false);

  const handleTouchMove = useCallback(
    (e) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];

        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (!isPanning) {
          setIsPanning(distance);
        } else {
          const scaleChange = distance / isPanning;
          setScale(prevScale => Math.min(Math.max(prevScale * scaleChange, 0.5), 2));
        }
      }
    },
    [isPanning, setIsPanning, setScale]
  );

  const handleTouchEnd = useCallback(() => {
    setIsPanning(false);
  }, []);

  return (
    <div 
      className={`image-container ${selectedIndex === index ? 'selected' : ''}`}
      onClick={() => handleImageClick(index)}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ flexBasis: `${size * 100}%`, overflow: 'hidden' }}
    >
      <Pannable>
        <Scalable scalex={scale} scaley={scale}>
          <img className="image" src={src} />
        </Scalable>
      </Pannable>
    </div>
  );
}

export default Image;
