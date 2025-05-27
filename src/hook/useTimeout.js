import { useEffect, useRef } from 'react';
export default function useTimeout(callback, delay = 1000) {
    const savedCallback = useRef(null);
    const id = useRef(null);
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
    useEffect(() => {
        function tick() {
            if (savedCallback.current)
                savedCallback.current();
        }
        if (delay !== null) {
            id.current = setTimeout(tick, delay);
            return () => clearTimeout(id.current);
        }
    }, [delay]);
    return function () {
        if (id.current)
            clearTimeout(id.current);
    };
}
