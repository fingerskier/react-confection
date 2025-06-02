import React from 'react'
<<<<<<< HEAD
import { useDeviceOrientation } from 'react-confection'


export default function DeviceOrientation() {
  const { alpha, beta, gamma } = useDeviceOrientation()

  return <div>
    <h2>DeviceOrientation</h2>
    <pre>{JSON.stringify({ alpha, beta, gamma }, null, 2)}</pre>
  </div>
}
=======
import useDeviceOrientation from '@hook/useDeviceOrientation'

export default function DeviceOrientationDemo() {
  const { alpha, beta, gamma } = useDeviceOrientation()

  return (
    <div>
      <h1>useDeviceOrientation</h1>
      <p>alpha: {alpha}</p>
      <p>beta: {beta}</p>
      <p>gamma: {gamma}</p>
    </div>
  )
}
>>>>>>> 4e69431607736d687a3387f46c650321984cd60e
