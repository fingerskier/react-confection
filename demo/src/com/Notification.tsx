import { useNotification } from 'react-confection'


export default function Notification() {
  const [notify] = useNotification()

  return (
    <div>
      <h2>Notification</h2>
      <button onClick={() => notify('Hello, world!')}>Notify</button>
    </div>
  )
}
