import type { FastifySchemaValidationError } from 'fastify/types/schema'
import type { ZodError } from 'zod'

interface FormattedFieldError {
  field: string
  error: string
}

interface FormattedValidationError {
  message: string
  errors: FormattedFieldError[]
}

export function formatZodError(error: ZodError): FormattedValidationError {
  const formattedErrors: FormattedFieldError[] = []

  for (const issue of error.issues) {
    const field = issue.path.length > 0 ? issue.path.join('.') : 'root'

    formattedErrors.push({
      field,
      error: issue.message,
    })
  }

  return {
    message: 'Validation error',
    errors: formattedErrors,
  }
}

export function formatFastifyValidationError(
  validationErrors: FastifySchemaValidationError[],
): FormattedValidationError {
  const formattedErrors: FormattedFieldError[] = []

  for (const err of validationErrors) {
    const instancePath =
      typeof err.instancePath === 'string' ? err.instancePath : ''

    const field =
      instancePath.length > 0
        ? instancePath.replace(/^\//, '').replace(/\//g, '.')
        : typeof err.params?.missingProperty === 'string'
          ? err.params.missingProperty
          : 'root'

    formattedErrors.push({
      field,
      error: err.message || 'Invalid value',
    })
  }

  return {
    message: 'Validation error',
    errors: formattedErrors,
  }
}
