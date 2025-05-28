import React from 'react'
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
