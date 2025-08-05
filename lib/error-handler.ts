export class AppError extends Error {
  public statusCode: number
  public isOperational: boolean

  constructor(message: string, statusCode = 500, isOperational = true) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational

    Error.captureStackTrace(this, this.constructor)
  }
}

export function handleError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error
  }

  if (error instanceof Error) {
    return new AppError(error.message, 500)
  }

  if (typeof error === "string") {
    return new AppError(error, 500)
  }

  return new AppError("An unknown error occurred", 500)
}

export function logError(error: AppError, context?: string): void {
  const timestamp = new Date().toISOString()
  const logMessage = `[${timestamp}] ${context ? `[${context}] ` : ""}${error.message}`

  console.error(logMessage)

  if (error.stack) {
    console.error(error.stack)
  }
}

export function isOperationalError(error: Error): boolean {
  if (error instanceof AppError) {
    return error.isOperational
  }
  return false
}

export function createValidationError(message: string): AppError {
  return new AppError(message, 400)
}

export function createNotFoundError(resource: string): AppError {
  return new AppError(`${resource} not found`, 404)
}

export function createUnauthorizedError(message = "Unauthorized"): AppError {
  return new AppError(message, 401)
}

export function createForbiddenError(message = "Forbidden"): AppError {
  return new AppError(message, 403)
}

export function createConflictError(message: string): AppError {
  return new AppError(message, 409)
}

export function createInternalServerError(message = "Internal server error"): AppError {
  return new AppError(message, 500)
}
