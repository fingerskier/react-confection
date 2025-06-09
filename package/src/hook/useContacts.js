import { useState, useCallback } from 'react';
export default function useContacts() {
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState(null);
    const pickContacts = useCallback(async () => {
        if (!('contacts' in navigator && 'ContactsManager' in window)) {
            setError('Contact Picker API is not supported on this device.');
            return;
        }
        try {
            const props = ['name', 'email', 'tel', 'address', 'icon'];
            const opts = { multiple: true };
            const selectedContacts = await navigator.contacts.select(props, opts);
            setContacts(selectedContacts);
        }
        catch (err) {
            setError(err.message);
        }
    }, []);
    return { contacts, error, pickContacts };
}
