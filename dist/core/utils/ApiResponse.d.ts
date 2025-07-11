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
export declare class ApiResponse {
    static success<T>(res: Response, data?: T, message?: string, statusCode?: number, meta?: ApiResponseData['meta']): Response;
    static error(res: Response, message?: string, statusCode?: number, data?: any): Response;
    static created<T>(res: Response, data?: T, message?: string): Response;
    static noContent(res: Response, message?: string): Response;
    static badRequest(res: Response, message?: string, data?: any): Response;
    static unauthorized(res: Response, message?: string): Response;
    static forbidden(res: Response, message?: string): Response;
    static notFound(res: Response, message?: string): Response;
    static conflict(res: Response, message?: string): Response;
    static internalError(res: Response, message?: string): Response;
}
//# sourceMappingURL=ApiResponse.d.ts.map