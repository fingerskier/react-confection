import { useEffect, useRef } from 'react';
export default function useTimeout(callback, delay = 1000) {
    const id = useRef(null);
    const start = () => {
        id.current = setTimeout(callback, delay);
    };
    const stop = () => {
        if (id.current)
            clearTimeout(id.current);
    };
    useEffect(() => {
        return () => {
            stop();
        };
    }, []);
    return [start, stop];
}
