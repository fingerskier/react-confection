import { useEffect, useState } from 'react';
export default function useUrl() {
    const [context, setContext] = useState('');
    const [query, setQuery] = useState({});
    const handleHashChange = () => {
        const hash = window.location.hash.slice(1);
        const queryString = window.location.search;
        const newContext = hash.includes('/') ? hash.split('/') : hash;
        const newQuery = new URLSearchParams(queryString);
        const trimmedContext = Array.isArray(newContext)
            ? newContext.map(item => item.trim()).join('/')
            : newContext.trim();
        const queryObj = Object.fromEntries(newQuery.entries());
        setContext(trimmedContext);
        setQuery(queryObj);
    };
    useEffect(() => {
        window.addEventListener('hashchange', handleHashChange);
        handleHashChange();
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);
    return { context, query };
}
