export default function useUrl(): {
    context: string | string[];
    query: {
        [k: string]: string;
    };
    goto: (path: string, newQuery?: {
        [k: string]: string;
    }, replace?: boolean) => void;
};
