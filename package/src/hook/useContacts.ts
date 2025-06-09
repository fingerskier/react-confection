import { useState, useCallback } from 'react';

declare global {
  interface Navigator {
    contacts?: {
      select: (props: string[], opts: { multiple: boolean }) => Promise<any[]>
    }
  }
}


export default function useContacts() {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState<string | null>(null);

  const pickContacts = useCallback(async () => {
    if (!('contacts' in navigator && 'ContactsManager' in window)) {
      setError('Contact Picker API is not supported on this device.');
      return;
    }

    try {
      const props = ['name', 'email', 'tel', 'address', 'icon'];
      const opts = { multiple: true };

      const selectedContacts = await (navigator as any).contacts.select(props, opts);
      setContacts(selectedContacts);
    } catch (err) {
      setError((err as Error).message);
    }
  }, []);

  return { contacts, error, pickContacts };
}