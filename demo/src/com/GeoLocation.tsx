import React from 'react'
import useGeolocation from '@hook/useGeoLocation'

export default function GeoLocationDemo() {
  const { position, error } = useGeolocation()

  return (
    <div>
      <h1>useGeoLocation</h1>
      {error && <p>{error}</p>}
      <pre>{JSON.stringify(position, null, 2)}</pre>
    </div>
  )
}
