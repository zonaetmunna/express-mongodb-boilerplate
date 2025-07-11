"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    static success(res, data, message = 'Success', statusCode = 200, meta) {
        const response = {
            success: true,
            message,
            data,
            ...(meta && { meta }),
        };
        return res.status(statusCode).json(response);
    }
    static error(res, message = 'An error occurred', statusCode = 500, data) {
        const response = {
            success: false,
            message,
            ...(data && { data }),
        };
        return res.status(statusCode).json(response);
    }
    static created(res, data, message = 'Created successfully') {
        return this.success(res, data, message, 201);
    }
    static noContent(res, message = 'No content') {
        return res.status(204).json({ success: true, message });
    }
    static badRequest(res, message = 'Bad request', data) {
        return this.error(res, message, 400, data);
    }
    static unauthorized(res, message = 'Unauthorized') {
        return this.error(res, message, 401);
    }
    static forbidden(res, message = 'Forbidden') {
        return this.error(res, message, 403);
    }
    static notFound(res, message = 'Resource not found') {
        return this.error(res, message, 404);
    }
    static conflict(res, message = 'Resource already exists') {
        return this.error(res, message, 409);
    }
    static internalError(res, message = 'Internal server error') {
        return this.error(res, message, 500);
    }
}
exports.ApiResponse = ApiResponse;
//# sourceMappingURL=ApiResponse.js.map