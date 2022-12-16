import React, { useEffect, useRef } from 'react';


export default function(callback, delay=1000) {
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
      id.current = setTimeout(tick, delay);
      return () => clearTimeout(id.current);
    }
  }, [delay]);


  return function() {
    clearTimeout(id.current)
    // console.log('Timeout cleared', id.current)
  }
}