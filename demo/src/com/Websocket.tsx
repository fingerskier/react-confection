import React from 'react'
import { useWebsocket } from 'react-confection'


export default function Websocket() {
  const { websocket, error, connect, disconnect, send, connected } = useWebsocket('wss://echo.websocket.org')


  return <>
    <h2>Websocket</h2>
    <button onClick={connect}>Connect</button>
    <button onClick={disconnect}>Disconnect</button>
    <button onClick={send}>Send</button>
    <p>{connected ? 'Connected' : 'Disconnected'}</p>
    <pre> {JSON.stringify(websocket, null, 2)} </pre>
  </>
}