// US State boundaries (simplified mapping for demo - in production, use a proper geocoding service)
const STATE_BOUNDARIES = {
  'CA': { name: 'California', bounds: { north: 42.0, south: 32.5, east: -114.1, west: -124.4 } },
  'NY': { name: 'New York', bounds: { north: 45.0, south: 40.5, east: -71.8, west: -79.8 } },
  'TX': { name: 'Texas', bounds: { north: 36.5, south: 25.8, east: -93.5, west: -106.6 } },
  'FL': { name: 'Florida', bounds: { north: 31.0, south: 24.4, east: -80.0, west: -87.6 } },
  'IL': { name: 'Illinois', bounds: { north: 42.5, south: 36.9, east: -87.0, west: -91.5 } },
  'PA': { name: 'Pennsylvania', bounds: { north: 42.3, south: 39.7, east: -74.7, west: -80.5 } },
  'OH': { name: 'Ohio', bounds: { north: 42.3, south: 38.4, east: -80.5, west: -84.8 } },
  'GA': { name: 'Georgia', bounds: { north: 35.0, south: 30.3, east: -80.8, west: -85.6 } },
  'NC': { name: 'North Carolina', bounds: { north: 36.6, south: 33.8, east: -75.4, west: -84.3 } },
  'MI': { name: 'Michigan', bounds: { north: 48.3, south: 41.7, east: -82.1, west: -90.4 } }
}

// Error handling utility
const handleGeolocationError = (error, operation) => {
  console.error(`Geolocation Error in ${operation}:`, error)
  
  const errorMessages = {
    1: 'Location access denied by user',
    2: 'Location information unavailable',
    3: 'Location request timed out'
  }
  
  const message = errorMessages[error.code] || error.message || 'Unknown geolocation error'
  throw new Error(`Failed to ${operation}: ${message}`)
}

// Get current position with enhanced options
export const getCurrentPosition = (options = {}) => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'))
      return
    }

    const defaultOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000, // 5 minutes
      ...options
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          altitudeAccuracy: position.coords.altitudeAccuracy,
          heading: position.coords.heading,
          speed: position.coords.speed,
          timestamp: position.timestamp
        })
      },
      (error) => {
        handleGeolocationError(error, 'get current position')
      },
      defaultOptions
    )
  })
}

// Watch position changes
export const watchPosition = (callback, errorCallback, options = {}) => {
  if (!navigator.geolocation) {
    errorCallback?.(new Error('Geolocation is not supported by this browser'))
    return null
  }

  const defaultOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 60000, // 1 minute for watching
    ...options
  }

  const watchId = navigator.geolocation.watchPosition(
    (position) => {
      callback({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: position.timestamp
      })
    },
    (error) => {
      errorCallback?.(error)
    },
    defaultOptions
  )

  return watchId
}

// Stop watching position
export const clearWatch = (watchId) => {
  if (watchId && navigator.geolocation) {
    navigator.geolocation.clearWatch(watchId)
  }
}

// Simple state detection based on coordinates (for demo purposes)
export const detectStateFromCoordinates = (lat, lng) => {
  for (const [stateCode, stateData] of Object.entries(STATE_BOUNDARIES)) {
    const { bounds } = stateData
    if (
      lat >= bounds.south &&
      lat <= bounds.north &&
      lng >= bounds.west &&
      lng <= bounds.east
    ) {
      return {
        stateCode,
        stateName: stateData.name,
        confidence: 'approximate' // Since this is a simplified detection
      }
    }
  }
  
  return null
}

// Reverse geocoding using a free service (in production, use Google Maps or similar)
export const reverseGeocode = async (lat, lng) => {
  try {
    // Using OpenStreetMap Nominatim (free but rate-limited)
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'KnowYourRights/1.0'
        }
      }
    )

    if (!response.ok) {
      throw new Error(`Geocoding request failed: ${response.status}`)
    }

    const data = await response.json()
    
    if (!data || !data.address) {
      throw new Error('No address data found')
    }

    const address = data.address
    const state = address.state
    const stateCode = getStateCodeFromName(state)

    return {
      address: data.display_name,
      city: address.city || address.town || address.village,
      county: address.county,
      state: state,
      stateCode: stateCode,
      country: address.country,
      postcode: address.postcode,
      raw: data
    }
  } catch (error) {
    console.error('Reverse geocoding failed:', error)
    
    // Fallback to simple coordinate-based detection
    const stateInfo = detectStateFromCoordinates(lat, lng)
    if (stateInfo) {
      return {
        address: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
        city: 'Unknown',
        county: 'Unknown',
        state: stateInfo.stateName,
        stateCode: stateInfo.stateCode,
        country: 'United States',
        postcode: null,
        raw: null
      }
    }
    
    throw error
  }
}

// Get state code from state name
const getStateCodeFromName = (stateName) => {
  const stateNameMap = {
    'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA',
    'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA',
    'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA',
    'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
    'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS', 'Missouri': 'MO',
    'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ',
    'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH',
    'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
    'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Vermont': 'VT',
    'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY',
    'District of Columbia': 'DC'
  }
  
  return stateNameMap[stateName] || null
}

// Get user's location and detect state
export const getUserLocationAndState = async (options = {}) => {
  try {
    const position = await getCurrentPosition(options)
    const geocodeData = await reverseGeocode(position.lat, position.lng)
    
    return {
      position,
      location: geocodeData,
      stateCode: geocodeData.stateCode,
      stateName: geocodeData.state
    }
  } catch (error) {
    handleGeolocationError(error, 'get user location and state')
  }
}

// Format coordinates for display
export const formatCoordinates = (lat, lng, precision = 4) => {
  return `${lat.toFixed(precision)}, ${lng.toFixed(precision)}`
}

// Calculate distance between two points (Haversine formula)
export const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371 // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c // Distance in kilometers
}

// Check if geolocation is supported
export const isGeolocationSupported = () => {
  return 'geolocation' in navigator
}

// Get location permission status
export const getLocationPermissionStatus = async () => {
  if (!navigator.permissions) {
    return 'unknown'
  }
  
  try {
    const permission = await navigator.permissions.query({ name: 'geolocation' })
    return permission.state // 'granted', 'denied', or 'prompt'
  } catch (error) {
    console.error('Error checking location permission:', error)
    return 'unknown'
  }
}

// Generate Google Maps URL for coordinates
export const generateMapsUrl = (lat, lng, zoom = 15) => {
  return `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}`
}

// Generate emergency location message
export const generateEmergencyLocationMessage = async (customMessage = '') => {
  try {
    const locationData = await getUserLocationAndState()
    const mapsUrl = generateMapsUrl(locationData.position.lat, locationData.position.lng)
    
    const message = `${customMessage ? customMessage + '\n\n' : ''}Emergency Location Alert:
📍 ${locationData.location.address}
🗺️ ${formatCoordinates(locationData.position.lat, locationData.position.lng)}
🔗 ${mapsUrl}
⏰ ${new Date().toLocaleString()}
📱 Accuracy: ${Math.round(locationData.position.accuracy)}m`

    return {
      message,
      location: locationData,
      mapsUrl
    }
  } catch (error) {
    // Fallback message if location fails
    return {
      message: `${customMessage ? customMessage + '\n\n' : ''}Emergency Alert - Location unavailable
⏰ ${new Date().toLocaleString()}
📱 Please share your location manually if safe to do so.`,
      location: null,
      mapsUrl: null
    }
  }
}
