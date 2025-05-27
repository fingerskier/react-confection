import { useState, useEffect } from 'react'


const useGeolocation = () => {
  const [position, setPosition] = useState<{
    timestamp: Date
    latitude: number
    longitude: number
    accuracy: number
    altitude: number
    altitudeAccuracy: number
    heading: number | null
    speed: number | null
  } | undefined>(undefined)
  const [error, setError] = useState<string | null>(null)
  
  
  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      return
    }
    
    const onSuccess = (position: GeolocationPosition) => {
      const pos = position
      
      const result = {
        timestamp: new Date(pos.timestamp),
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        accuracy: pos.coords.accuracy<200? pos.coords.accuracy: 0,
        altitude: pos.coords.altitude || 0,
        altitudeAccuracy: pos.coords.altitudeAccuracy || 0,
        heading: pos.coords.heading,
        speed: pos.coords.speed,
      }
      
      setPosition(result)
    }
    
    const onError = (error: GeolocationPositionError) => {
      setError(error.message)
    }
    
    navigator.geolocation.getCurrentPosition(onSuccess, onError)
    
    const watcher = navigator.geolocation.watchPosition(onSuccess, onError)
    
    return ()=>{
      navigator.geolocation.clearWatch(watcher)
    }
  }, [])
  
  
  return { position, error }
}


export default useGeolocation