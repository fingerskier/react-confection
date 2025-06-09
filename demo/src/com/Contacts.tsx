import React from 'react'
import useContactPicker from '@/hook/useContacts'

export default function ContactsDemo() {
  const { contacts, error, pickContacts } = useContactPicker()

  return (
    <div>
      <h1>useContacts</h1>
      <button onClick={pickContacts}>Pick Contacts</button>
      {error && <p>{error}</p>}
      <pre>{JSON.stringify(contacts, null, 2)}</pre>
    </div>
  )
}
