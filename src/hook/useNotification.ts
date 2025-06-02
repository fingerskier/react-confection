import { useState } from 'react'


export default function useNotification() {
  const [permission, setPermission] = useState<NotificationPermission | null>(null)


  function notify(msg: string, options?: NotificationOptions) {
    if (!('Notification' in window)) return
    if (permission === 'granted') {
      new Notification(msg, options)
    } else if (permission !== 'denied') {
      Notification.requestPermission().then(result => {
        setPermission(result)
        if (result === 'granted') {
          new Notification(msg, options)
        }
      })
      .catch(console.error)
    }
  }

  return [notify, permission] as const
}