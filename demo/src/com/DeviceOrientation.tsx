import React from 'react'
import { useDeviceOrientation } from 'react-confection'


export default function DeviceOrientation() {
  const { alpha, beta, gamma } = useDeviceOrientation()

  return <div>
    <h2>DeviceOrientation</h2>
    <pre>{JSON.stringify({ alpha, beta, gamma }, null, 2)}</pre>
  </div>
}
