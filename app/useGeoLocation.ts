/**
 * Thanks to this great example
 * @example https://itnext.io/creating-react-useposition-hook-for-getting-browsers-geolocation-2f27fc1d96de
 */

import { useState, useEffect } from 'react'

interface ErrorProps {
  message: string
}

interface Coordinates {
  latitude: number
  longitude: number
}

interface Position {
  coords: Coordinates
  timestamp: number
}

export const usePosition = () => {
  /** taking default longitude and latitude as it takes time to get the data */
  const [position, setPosition] = useState<Coordinates>({
    latitude: undefined,
    longitude: undefined
  })
  const [error, setError] = useState<string>()

  const onChange = (position: Position) => {
    setPosition({ ...position, latitude: position.coords.latitude, longitude: position.coords.longitude })
  }
  const onError = (error: ErrorProps) => {
    setError('Please enable location service')
  }
  useEffect(() => {
    const geo = navigator.geolocation
    if (!geo) {
      setError('Geolocation is not supported')
      return () => {}
    }
    const watcher = geo.watchPosition(onChange, onError)
    return () => geo.clearWatch(watcher)
  }, [])
  return { ...position, error }
}
