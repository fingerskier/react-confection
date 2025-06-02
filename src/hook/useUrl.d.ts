export default function useUrl(): {
    context: string | string[];
    query: {
        [k: string]: string;
    };
};
