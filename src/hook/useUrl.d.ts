export interface UseUrlQuery {
    [k: string]: string;
}
export interface UseUrlReturn {
    context: string | string[];
    query: UseUrlQuery;
    goto: (path: string, newQuery?: UseUrlQuery, replace?: boolean) => void;
}
export default function useUrl(): UseUrlReturn;
