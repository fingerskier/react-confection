const calculateDistance = (pos1, pos2) => {
  const toRadians = (degrees) => degrees * (Math.PI / 180)
  const R = 6371e3 // Earth's radius in meters
  const φ1 = toRadians(pos1.latitude)
  const φ2 = toRadians(pos2.latitude)
  const Δφ = toRadians(pos2.latitude - pos1.latitude)
  const Δλ = toRadians(pos2.longitude - pos1.longitude)
  
  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  
  return R * c // Distance in meters
}


const calculateHeading = (pos1, pos2) => {
  const toRadians = (degrees) => degrees * (Math.PI / 180)
  const toDegrees = (radians) => radians * (180 / Math.PI)
  
  const Δλ = toRadians(pos2.longitude - pos1.longitude)
  const φ1 = toRadians(pos1.latitude)
  const φ2 = toRadians(pos2.latitude)
  
  const y = Math.sin(Δλ) * Math.cos(φ2)
  const x = Math.cos(φ1) * Math.sin(φ2) -
    Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ)
  
  return (toDegrees(Math.atan2(y, x)) + 360) % 360 // Heading in degrees
}


const fillMissingSpeeds = (el1, el2) => {
  const result = {}
  
  if (!el2.speed) {
    const distance = calculateDistance(el2, el1)
    
    const time = (el1.timestamp - el2.timestamp) / 1000
    
    result.speed = distance / time
    console.log('mustcalcspd', el1, el2, result.speed)
  }
  
  if (!el2.heading) {
    result.heading = calculateHeading(el1, el2)
    console.log('mustcalcheading', result.heading)
  }
  
  return result
}


export { 
  calculateDistance,
  calculateHeading,
  fillMissingSpeeds,
}