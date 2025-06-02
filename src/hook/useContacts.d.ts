declare global {
    interface Navigator {
        contacts?: {
            select: (props: string[], opts: {
                multiple: boolean;
            }) => Promise<any[]>;
        };
    }
}
export default function useContacts(): {
    contacts: never[];
    error: string | null;
    pickContacts: () => Promise<void>;
};
