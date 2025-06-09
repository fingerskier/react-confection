import { useState, useEffect } from 'react';

const useDeviceOrientation = () => {
  const [orientation, setOrientation] = useState<{
    alpha: number | null
    beta: number | null
    gamma: number | null
  }>({
    alpha: null,
    beta: null,
    gamma: null
  });

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      setOrientation({
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma
      });
    };

    window.addEventListener('deviceorientation', handleOrientation);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  return orientation;
};

export default useDeviceOrientation;