import React, { useRef } from 'react';

export const PictureInPicture = ({
  children,
  width = 320,
  height = 240,
  onPiPEnter,
  onPiPExit,
  className = '',
  controls = true
}) => {
  const containerRef = useRef(null);
  const { isPiP, isSupported, togglePiP } = usePictureInPicture({ width, height });

  const handleToggle = async () => {
    await togglePiP(containerRef.current);
    if (!isPiP && onPiPEnter) onPiPEnter();
    if (isPiP && onPiPExit) onPiPExit();
  };

  if (!isSupported) {
    return (
      <div className={className}>
        {children}
        {controls && (
          <button disabled>PiP Not Supported</button>
        )}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={className}>
      {children}
      {controls && (
        <button onClick={handleToggle}>
          {isPiP ? 'Exit PiP Mode' : 'Enter PiP Mode'}
        </button>
      )}
    </div>
  );
};
