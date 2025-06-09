import React, { useState } from 'react'
import { useWebSocket } from 'react-confection'

export default function WebSocketDemo() {
  const [messages, setMessages] = useState<string[]>([])
  const { data, transmit } = useWebSocket('wss://ws.ifelse.io')

  React.useEffect(() => {
    if (data) setMessages(msgs => [...msgs, JSON.stringify(data)])
  }, [data])

  return (
    <div>
      <h1>useWebSocket</h1>
      <button onClick={() => transmit({ hello: 'world' })}>Send</button>
      <ul>
        {messages.map((m, i) => <li key={i}>{m}</li>)}
      </ul>
    </div>
  )
}
