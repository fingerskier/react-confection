import React, { useEffect, useRef } from 'react';


export default function useInterval(callback, delay=1000) {
  const savedCallback = useRef()
  const id = useRef()

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      id.current = setInterval(tick, delay);
      return () => clearInterval(id.current);
    }
  }, [delay]);

  return function() {
    clearInterval(id.current)
    // console.log('interval cleared', id.current)
  }
}