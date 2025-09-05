// Environment configuration for KnowYourRights app
const isDevelopment = import.meta.env.MODE === 'development'
const isProduction = import.meta.env.MODE === 'production'
const isTest = import.meta.env.MODE === 'test'

// Validate required environment variables
const requiredEnvVars = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY'
]

const missingEnvVars = requiredEnvVars.filter(
  varName => !import.meta.env[varName]
)

if (missingEnvVars.length > 0 && isProduction) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVars.join(', ')}`
  )
}

// App configuration
export const config = {
  // Environment flags
  isDevelopment,
  isProduction,
  isTest,

  // App metadata
  app: {
    name: import.meta.env.VITE_APP_NAME || 'KnowYourRights',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    environment: import.meta.env.VITE_APP_ENVIRONMENT || 'development'
  },

  // API endpoints and keys
  api: {
    supabase: {
      url: import.meta.env.VITE_SUPABASE_URL,
      anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
      enabled: !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY)
    },
    openai: {
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      enabled: !!import.meta.env.VITE_OPENAI_API_KEY
    },
    stripe: {
      publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
      enabled: !!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
    },
    geocoding: {
      apiKey: import.meta.env.VITE_GEOCODING_API_KEY,
      enabled: !!import.meta.env.VITE_GEOCODING_API_KEY
    }
  },

  // Feature flags
  features: {
    // Core features
    stateGuides: true,
    scriptLibrary: true,
    incidentLogging: true,
    emergencyAlerts: true,
    
    // Enhanced features (depend on API availability)
    aiScriptGeneration: !!import.meta.env.VITE_OPENAI_API_KEY,
    userAuthentication: !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY),
    paymentProcessing: !!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
    advancedGeolocation: !!import.meta.env.VITE_GEOCODING_API_KEY,
    
    // Development features
    debugMode: isDevelopment,
    errorReporting: isProduction,
    analytics: isProduction && !!import.meta.env.VITE_ANALYTICS_ID
  },

  // UI/UX settings
  ui: {
    // Theme settings
    theme: {
      defaultMode: 'light', // 'light' | 'dark' | 'system'
      allowToggle: true
    },
    
    // Animation settings
    animations: {
      enabled: true,
      reducedMotion: false // Will be overridden by user preference
    },
    
    // Layout settings
    layout: {
      sidebarWidth: 320,
      mobileBreakpoint: 1024,
      maxContentWidth: 1200
    }
  },

  // Performance settings
  performance: {
    // Caching
    cacheTimeout: 5 * 60 * 1000, // 5 minutes
    maxCacheSize: 50, // Maximum number of cached items
    
    // API settings
    apiTimeout: 10000, // 10 seconds
    retryAttempts: 3,
    retryDelay: 1000, // 1 second
    
    // Geolocation settings
    locationTimeout: 10000, // 10 seconds
    locationMaxAge: 5 * 60 * 1000, // 5 minutes
    locationHighAccuracy: true
  },

  // Security settings
  security: {
    // Content Security Policy
    csp: {
      enabled: isProduction,
      reportOnly: isDevelopment
    },
    
    // Data handling
    dataRetention: {
      incidentLogs: 365, // days
      userSessions: 30, // days
      errorLogs: 90 // days
    },
    
    // Privacy settings
    privacy: {
      anonymousUsage: true,
      locationTracking: false, // Only when explicitly requested
      errorReporting: isProduction
    }
  },

  // External services
  services: {
    analytics: {
      id: import.meta.env.VITE_ANALYTICS_ID,
      enabled: isProduction && !!import.meta.env.VITE_ANALYTICS_ID
    },
    
    monitoring: {
      enabled: isProduction,
      sampleRate: isProduction ? 0.1 : 1.0 // 10% in production, 100% in development
    }
  },

  // Development tools
  development: {
    // Logging
    logging: {
      level: isDevelopment ? 'debug' : 'error',
      console: isDevelopment,
      remote: isProduction
    },
    
    // Debug tools
    debug: {
      showStateInspector: isDevelopment,
      showPerformanceMetrics: isDevelopment,
      mockApiResponses: false // Can be enabled for testing
    }
  }
}

// Utility functions
export const getApiUrl = (service) => {
  const urls = {
    supabase: config.api.supabase.url,
    openai: 'https://api.openai.com/v1',
    stripe: 'https://api.stripe.com/v1',
    geocoding: 'https://api.mapbox.com/geocoding/v5' // Example
  }
  
  return urls[service] || null
}

export const isFeatureEnabled = (featureName) => {
  return config.features[featureName] === true
}

export const getEnvironmentInfo = () => {
  return {
    name: config.app.name,
    version: config.app.version,
    environment: config.app.environment,
    buildTime: new Date().toISOString(),
    features: Object.entries(config.features)
      .filter(([, enabled]) => enabled)
      .map(([name]) => name)
  }
}

// Validation helpers
export const validateConfiguration = () => {
  const errors = []
  const warnings = []

  // Check required APIs for core functionality
  if (!config.api.supabase.enabled) {
    errors.push('Supabase configuration is missing - user authentication and data persistence will not work')
  }

  // Check optional but recommended APIs
  if (!config.api.openai.enabled) {
    warnings.push('OpenAI API not configured - AI features will be disabled')
  }

  if (!config.api.stripe.enabled) {
    warnings.push('Stripe not configured - payment processing will use Web3 only')
  }

  if (!config.api.geocoding.enabled) {
    warnings.push('Geocoding API not configured - location detection will be limited')
  }

  return { errors, warnings }
}

// Initialize configuration validation
if (isDevelopment) {
  const { errors, warnings } = validateConfiguration()
  
  if (errors.length > 0) {
    console.error('❌ Configuration Errors:', errors)
  }
  
  if (warnings.length > 0) {
    console.warn('⚠️ Configuration Warnings:', warnings)
  }
  
  console.log('🔧 Environment Info:', getEnvironmentInfo())
}

export default config
