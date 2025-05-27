import { useEffect, useState } from 'react';
import useTimeout from '@hook/useTimeout';
export default function useWait(condition, timeoutSeconds = 60, intervalMilliseconds = 100) {
    const [done, setDone] = useState(false);
    const [timeout, setTimeoutState] = useState(false);
    let ticker;
    const cancelSafety = useTimeout(() => {
        setTimeoutState(true);
    }, timeoutSeconds * 1000);
    useEffect(() => {
        return () => {
            cancelSafety();
            clearInterval(ticker);
        };
    }, []);
    useEffect(() => {
        if (condition) {
            setDone(true);
        }
    }, [condition]);
    return new Promise((resolve, reject) => {
        ticker = setInterval(() => {
            if (done) {
                resolve();
            }
            if (timeout) {
                clearInterval(ticker);
                reject(new Error('Timeout'));
            }
        }, intervalMilliseconds);
    });
}
