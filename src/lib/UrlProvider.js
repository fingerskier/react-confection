import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from 'react';
const UrlContext = createContext(undefined);
export function UrlProvider({ children }) {
    const [context, setContext] = useState('');
    const [query, setQuery] = useState({});
    const goto = (path, Q, replaceQuery = false) => {
        let newQuery;
        if (replaceQuery) {
            newQuery = Q;
        }
        else {
            newQuery = {
                ...query,
                ...Q,
            };
        }
        const queryString = newQuery ? new URLSearchParams(newQuery).toString() : '';
        let newUrl = queryString ? `?${queryString}` : '';
        if (path) {
            newUrl += `#${path}`;
        }
        else {
            newUrl += `#${context}`;
        }
        window.history.pushState({}, '', newUrl);
        handleHashChange();
    };
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
    const value = { context, query, goto };
    return (_jsx(UrlContext.Provider, { value: value, children: children }));
}
export function useUrl() {
    const context = useContext(UrlContext);
    if (context === undefined) {
        throw new Error('useUrl must be used within a UrlProvider');
    }
    return context;
}
