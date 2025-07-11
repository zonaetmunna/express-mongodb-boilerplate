import { ApiResponse } from '@/core/utils';
import { Response } from 'express';

export abstract class BaseController {
  protected sendSuccess<T>(
    res: Response,
    data?: T,
    message = 'Success',
    statusCode = 200
  ): Response {
    return ApiResponse.success(res, data, message, statusCode);
  }

  protected sendError(
    res: Response,
    message = 'An error occurred',
    statusCode = 500
  ): Response {
    return ApiResponse.error(res, message, statusCode);
  }

  protected sendCreated<T>(res: Response, data?: T, message = 'Created successfully'): Response {
    return ApiResponse.created(res, data, message);
  }

  protected sendNotFound(res: Response, message = 'Resource not found'): Response {
    return ApiResponse.notFound(res, message);
  }

  protected sendBadRequest(res: Response, message = 'Bad request'): Response {
    return ApiResponse.badRequest(res, message);
  }

  protected sendUnauthorized(res: Response, message = 'Unauthorized'): Response {
    return ApiResponse.unauthorized(res, message);
  }

  protected sendForbidden(res: Response, message = 'Forbidden'): Response {
    return ApiResponse.forbidden(res, message);
  }
}