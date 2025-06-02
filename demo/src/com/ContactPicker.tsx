import {useContacts} from 'react-confection'


export default function ContactPicker() {
  const { contacts, error, pickContacts } = useContacts()

  return <div>
    <h2>Contact Picker</h2>
    <button onClick={pickContacts}>Pick Contacts</button>
    <pre>{JSON.stringify(contacts, null, 2)}</pre>
    <pre>{JSON.stringify(error, null, 2)}</pre>
  </div>
}