declare global {
    interface Navigator {
        contacts?: {
            select: (props: string[], opts: {
                multiple: boolean;
            }) => Promise<any[]>;
        };
    }
}
declare const useContactPicker: () => {
    contacts: never[];
    error: string | null;
    pickContacts: () => Promise<void>;
};
export default useContactPicker;
