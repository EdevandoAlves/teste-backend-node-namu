import { Request, Response, NextFunction } from 'express'
import { ZodError, z } from 'zod'
import { AppError } from '../errors/AppError'

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation error',
      errors: z.flattenError(err),
    })
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    })
  }

  return res.status(500).json({
    message: err.message,
  })
}
