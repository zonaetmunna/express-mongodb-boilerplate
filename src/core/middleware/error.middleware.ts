import { env, logger } from '@/config';
import { ApiResponse, AppError } from '@/core/utils';
import { NextFunction, Request, Response } from 'express';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  let appError = error;

  // Convert non-AppError errors to AppError
  if (!(error instanceof AppError)) {
    const statusCode = 500;
    const message = env.NODE_ENV === 'production' ? 'Something went wrong!' : error.message;
    appError = new AppError(message, statusCode, false);
  }

  const { statusCode, message } = appError as AppError;

  // Log error
  logger.error({
    error: {
      message: error.message,
      stack: error.stack,
      statusCode,
    },
    request: {
      method: req.method,
      url: req.url,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
    },
  });

  // Send error response
  return ApiResponse.error(res, message, statusCode);
};

export const notFoundHandler = (req: Request, res: Response): Response => {
  return ApiResponse.notFound(res, `Route ${req.originalUrl} not found`);
};