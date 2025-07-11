import { Response } from 'express';
export declare abstract class BaseController {
    protected sendSuccess<T>(res: Response, data?: T, message?: string, statusCode?: number): Response;
    protected sendError(res: Response, message?: string, statusCode?: number): Response;
    protected sendCreated<T>(res: Response, data?: T, message?: string): Response;
    protected sendNotFound(res: Response, message?: string): Response;
    protected sendBadRequest(res: Response, message?: string): Response;
    protected sendUnauthorized(res: Response, message?: string): Response;
    protected sendForbidden(res: Response, message?: string): Response;
}
//# sourceMappingURL=BaseController.d.ts.map