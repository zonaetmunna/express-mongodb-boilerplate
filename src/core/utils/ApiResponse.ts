import { Response } from 'express';

export interface ApiResponseData<T = any> {
  success: boolean;
  message: string;
  data?: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export class ApiResponse {
  static success<T>(
    res: Response,
    data?: T,
    message = 'Success',
    statusCode = 200,
    meta?: ApiResponseData['meta']
  ): Response {
    const response: ApiResponseData<T> = {
      success: true,
      message,
      data,
      ...(meta && { meta }),
    };

    return res.status(statusCode).json(response);
  }

  static error(
    res: Response,
    message = 'An error occurred',
    statusCode = 500,
    data?: any
  ): Response {
    const response: ApiResponseData = {
      success: false,
      message,
      ...(data && { data }),
    };

    return res.status(statusCode).json(response);
  }

  static created<T>(
    res: Response,
    data?: T,
    message = 'Created successfully'
  ): Response {
    return this.success(res, data, message, 201);
  }

  static noContent(res: Response, message = 'No content'): Response {
    return res.status(204).json({ success: true, message });
  }

  static badRequest(
    res: Response,
    message = 'Bad request',
    data?: any
  ): Response {
    return this.error(res, message, 400, data);
  }

  static unauthorized(res: Response, message = 'Unauthorized'): Response {
    return this.error(res, message, 401);
  }

  static forbidden(res: Response, message = 'Forbidden'): Response {
    return this.error(res, message, 403);
  }

  static notFound(res: Response, message = 'Resource not found'): Response {
    return this.error(res, message, 404);
  }

  static conflict(
    res: Response,
    message = 'Resource already exists'
  ): Response {
    return this.error(res, message, 409);
  }

  static internalError(
    res: Response,
    message = 'Internal server error'
  ): Response {
    return this.error(res, message, 500);
  }
}
