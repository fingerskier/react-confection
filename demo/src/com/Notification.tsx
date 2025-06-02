<<<<<<< HEAD
import React from 'react'
import { useNotification } from 'react-confection'


export default function Notification() {
  const [notify, permission] = useNotification()

  return (
    <div>
      <h2>Notification</h2>
      <button onClick={() => notify('Hello, world!')}>Notify</button>
    </div>
  )
}
=======
export default function NotificationDemo() {
  return (
    <div>
      <h1>useNotification</h1>
      <p>Not implemented</p>
    </div>
  )
}
>>>>>>> 4e69431607736d687a3387f46c650321984cd60e
