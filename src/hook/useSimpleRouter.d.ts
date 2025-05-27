import React from 'react';
import type { ReactNode, ReactElement } from 'react';
/**
 * A simple React router hook that provides hash-based routing functionality
 * with query parameter support.
 *
 * @returns {Object} Router utilities and components
 * @property {string[]} context - Current route segments
 * @property {Object} state - Current query parameters
 * @property {Function} pushState - Add query parameter to URL with history entry
 * @property {Function} replaceState - Replace query parameter without history entry
 * @property {Function} Route - Route component for rendering based on path
 */
export interface SimpleRouterState {
    [key: string]: string;
}
export interface RouteProps {
    depth?: number;
    path: string;
    element?: ReactElement;
    children?: ReactNode;
}
export default function useSimpleRouter(): {
    context: string[];
    state: SimpleRouterState;
    pushState: (key: string, value: string) => void;
    replaceState: (key: string, value: string) => void;
    Route: ({ depth, path, element, children }: RouteProps) => string | number | bigint | Iterable<React.ReactNode> | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | null;
};
