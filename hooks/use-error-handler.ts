"use client"

import { useState, useCallback } from "react"
import { toast } from "sonner"

interface ErrorState {
  error: Error | null
  isError: boolean
}

interface UseErrorHandlerReturn {
  error: Error | null
  isError: boolean
  handleError: (error: Error | string) => void
  clearError: () => void
  withErrorHandling: <T extends any[], R>(fn: (...args: T) => Promise<R>) => (...args: T) => Promise<R | undefined>
}

export function useErrorHandler(): UseErrorHandlerReturn {
  const [errorState, setErrorState] = useState<ErrorState>({
    error: null,
    isError: false,
  })

  const handleError = useCallback((error: Error | string) => {
    const errorObj = typeof error === "string" ? new Error(error) : error

    setErrorState({
      error: errorObj,
      isError: true,
    })

    // Show toast notification
    toast.error(errorObj.message || "An unexpected error occurred")

    // Log error for debugging
    console.error("Error handled:", errorObj)
  }, [])

  const clearError = useCallback(() => {
    setErrorState({
      error: null,
      isError: false,
    })
  }, [])

  const withErrorHandling = useCallback(
    <T extends any[], R>(fn: (...args: T) => Promise<R>) => {
      return async (...args: T): Promise<R | undefined> => {
        try {
          clearError()
          return await fn(...args)
        } catch (error) {
          handleError(error as Error)
          return undefined
        }
      }
    },
    [handleError, clearError],
  )

  return {
    error: errorState.error,
    isError: errorState.isError,
    handleError,
    clearError,
    withErrorHandling,
  }
}

// Specific error types for better error handling
export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
  ) {
    super(message)
    this.name = "APIError"
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public field?: string,
  ) {
    super(message)
    this.name = "ValidationError"
  }
}

export class NetworkError extends Error {
  constructor(message = "Network connection failed") {
    super(message)
    this.name = "NetworkError"
  }
}

// Error handler for API calls
export async function handleAPIResponse(response: Response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new APIError(
      errorData.error || `HTTP ${response.status}: ${response.statusText}`,
      response.status,
      errorData.code,
    )
  }
  return response.json()
}

// Retry mechanism for failed operations
export function withRetry<T extends any[], R>(fn: (...args: T) => Promise<R>, maxRetries = 3, delay = 1000) {
  return async (...args: T): Promise<R> => {
    let lastError: Error

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await fn(...args)
      } catch (error) {
        lastError = error as Error

        if (attempt === maxRetries) {
          throw lastError
        }

        // Exponential backoff
        await new Promise((resolve) => setTimeout(resolve, delay * Math.pow(2, attempt - 1)))
      }
    }

    throw lastError!
  }
}
