import React from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      retryCount: 0
    }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('Error Boundary caught an error:', error, errorInfo)
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    })

    // Report error to monitoring service (if configured)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.toString(),
        fatal: false
      })
    }
  }

  handleRetry = () => {
    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prevState.retryCount + 1
    }))
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      const { error, errorInfo, retryCount } = this.state
      const { fallback: CustomFallback } = this.props

      // If a custom fallback is provided, use it
      if (CustomFallback) {
        return (
          <CustomFallback
            error={error}
            errorInfo={errorInfo}
            onRetry={this.handleRetry}
            retryCount={retryCount}
          />
        )
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-bg flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="card text-center">
              <div className="p-4 bg-red-50 rounded-lg mb-6">
                <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h1 className="text-xl font-semibold text-red-800 mb-2">
                  Something went wrong
                </h1>
                <p className="text-red-600 text-sm">
                  We're sorry, but something unexpected happened. The error has been logged and we'll look into it.
                </p>
              </div>

              {/* Error details (only in development) */}
              {process.env.NODE_ENV === 'development' && error && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                  <h3 className="font-medium text-gray-800 mb-2">Error Details:</h3>
                  <pre className="text-xs text-gray-600 overflow-auto max-h-32">
                    {error.toString()}
                  </pre>
                  {errorInfo && (
                    <>
                      <h4 className="font-medium text-gray-800 mt-3 mb-1">Stack Trace:</h4>
                      <pre className="text-xs text-gray-600 overflow-auto max-h-32">
                        {errorInfo.componentStack}
                      </pre>
                    </>
                  )}
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={this.handleRetry}
                  className="btn-primary w-full flex items-center justify-center space-x-2"
                  disabled={retryCount >= 3}
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>
                    {retryCount >= 3 ? 'Max retries reached' : 'Try Again'}
                  </span>
                </button>

                <button
                  onClick={this.handleGoHome}
                  className="btn-secondary w-full flex items-center justify-center space-x-2"
                >
                  <Home className="w-4 h-4" />
                  <span>Go to Home</span>
                </button>
              </div>

              {retryCount > 0 && (
                <p className="text-sm text-textSecondary mt-4">
                  Retry attempts: {retryCount}/3
                </p>
              )}
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Hook version for functional components
export const useErrorHandler = () => {
  const [error, setError] = React.useState(null)

  const resetError = React.useCallback(() => {
    setError(null)
  }, [])

  const captureError = React.useCallback((error, errorInfo = {}) => {
    console.error('Error captured:', error, errorInfo)
    setError({ error, errorInfo })

    // Report to monitoring service
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.toString(),
        fatal: false
      })
    }
  }, [])

  React.useEffect(() => {
    if (error) {
      throw error.error
    }
  }, [error])

  return { captureError, resetError }
}

// Higher-order component for wrapping components with error boundary
export const withErrorBoundary = (Component, fallback) => {
  const WrappedComponent = (props) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  )

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`
  
  return WrappedComponent
}

// Async error boundary for handling promise rejections
export const AsyncErrorBoundary = ({ children, onError }) => {
  React.useEffect(() => {
    const handleUnhandledRejection = (event) => {
      console.error('Unhandled promise rejection:', event.reason)
      
      if (onError) {
        onError(event.reason, { type: 'unhandledRejection' })
      }

      // Report to monitoring service
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'exception', {
          description: `Unhandled Promise Rejection: ${event.reason}`,
          fatal: false
        })
      }
    }

    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [onError])

  return <ErrorBoundary>{children}</ErrorBoundary>
}

export default ErrorBoundary
