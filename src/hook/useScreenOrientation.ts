import { useState, useEffect } from 'react';

type Orientation = {
  angle: number;
  type: string;
};

const useScreenOrientation = (): Orientation => {
  const [orientation, setOrientation] = useState<Orientation>({
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