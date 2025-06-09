import type { ReactNode } from 'react';
export interface UseUrlQuery {
    [k: string]: string;
}
export interface UseUrlReturn {
    context: string | string[];
    query: UseUrlQuery;
    goto: (path?: string | null, newQuery?: UseUrlQuery | null, replace?: boolean) => void;
}
interface UrlProviderProps {
    children: ReactNode;
}
export declare function UrlProvider({ children }: UrlProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useUrl(): UseUrlReturn;
export {};
