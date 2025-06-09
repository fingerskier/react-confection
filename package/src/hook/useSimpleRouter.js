import React, { useEffect, useState, useCallback } from 'react';
export default function useSimpleRouter() {
    const [context, setContext] = useState([]);
    const [state, setState] = useState({});
    /**
     * Handles hash changes by updating route context and query parameters
     */
    const handleHashChange = useCallback(() => {
        // Parse route segments from hash
        const routeSegments = window.location.hash.substring(1).split('/').filter(Boolean);
        setContext(routeSegments);
        // Parse query parameters
        const queryString = window.location.search.substring(1);
        if (queryString) {
            const queryParams = new URLSearchParams(queryString);
            const newState = {};
            for (const [key, value] of queryParams.entries()) {
                newState[key] = value;
            }
            setState(newState);
        }
        else {
            setState({});
        }
    }, []);
    /**
     * Add a query parameter to the URL with a new history entry
     * @param {string} key - Parameter name
     * @param {string} value - Parameter value
     */
    const pushState = useCallback((key, value) => {
        const url = new URL(window.location.href);
        url.searchParams.set(key, value);
        window.history.pushState({}, '', url);
        // Manually trigger state update since pushState doesn't trigger hashchange
        setState(prev => ({ ...prev, [key]: value }));
    }, []);
    /**
     * Replace a query parameter without creating a new history entry
     * @param {string} key - Parameter name
     * @param {string} value - Parameter value
     */
    const replaceState = useCallback((key, value) => {
        const url = new URL(window.location.href);
        url.searchParams.set(key, value);
        window.history.replaceState({}, '', url);
        // Manually trigger state update
        setState(prev => ({ ...prev, [key]: value }));
    }, []);
    useEffect(() => {
        // Initialize route on mount
        handleHashChange();
        // Add hash change listener
        window.addEventListener('hashchange', handleHashChange);
        window.addEventListener('popstate', handleHashChange);
        // Cleanup listeners on unmount
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
            window.removeEventListener('popstate', handleHashChange);
        };
    }, [handleHashChange]);
    /**
     * Route component for conditional rendering based on URL path
     * @param {Object} props - Component props
     * @param {number} [props.depth=0] - Depth level in route hierarchy
     * @param {string} props.path - Path segment to match
     * @param {React.ReactElement} [props.element] - Element to render
     * @param {React.ReactNode} [props.children] - Child elements
     */
    function Route({ depth = 0, path, element, children }) {
        // Validate required path prop
        if (!path) {
            console.warn('Route component requires a path prop');
            return null;
        }
        // Check if current route segment matches path
        if (context[depth] !== path) {
            return null;
        }
        // Handle nested routes by injecting depth
        const injectDepth = (child) => {
            if (React.isValidElement(child) && child.type === Route) {
                return React.cloneElement(child, { depth: depth + 1 });
            }
            return child;
        };
        if (children) {
            children = React.Children.map(children, injectDepth);
        }
        // Render logic
        if (element && children) {
            return React.cloneElement(element, {}, children);
        }
        else if (element) {
            return element;
        }
        else if (children) {
            return children;
        }
        return null;
    }
    return {
        context,
        state,
        pushState,
        replaceState,
        Route,
    };
}
