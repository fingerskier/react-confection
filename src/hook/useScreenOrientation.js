import { useState, useEffect } from 'react';

const useScreenOrientation = () => {
  const [orientation, setOrientation] = useState({
    angle: window.screen.orientation?.angle || 0,
    type: window.screen.orientation?.type || 'unknown'
  });

  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation({
        angle: window.screen.orientation.angle,
        type: window.screen.orientation.type
      });
    };

    window.screen.orientation?.addEventListener('change', handleOrientationChange);

    return () => {
      window.screen.orientation?.removeEventListener('change', handleOrientationChange);
    };
  }, []);

  return orientation;
};

export default useScreenOrientation;