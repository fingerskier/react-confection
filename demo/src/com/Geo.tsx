import React from 'react'
import { useGeoLocation } from 'react-confection'


export default function Geo() {
  const { position, error } = useGeoLocation()

  return (
    <div>
      <h2>Geo</h2>

      Position:
      <pre>{JSON.stringify(position, null, 2)}</pre>

      Error:
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>
  )
}