"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.errorHandler = void 0;
const config_1 = require("@/config");
const utils_1 = require("@/core/utils");
const errorHandler = (error, req, res, next) => {
    let appError = error;
    if (!(error instanceof utils_1.AppError)) {
        const statusCode = 500;
        const message = config_1.env.NODE_ENV === 'production' ? 'Something went wrong!' : error.message;
        appError = new utils_1.AppError(message, statusCode, false);
    }
    const { statusCode, message } = appError;
    config_1.logger.error({
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
    return utils_1.ApiResponse.error(res, message, statusCode);
};
exports.errorHandler = errorHandler;
const notFoundHandler = (req, res) => {
    return utils_1.ApiResponse.notFound(res, `Route ${req.originalUrl} not found`);
};
exports.notFoundHandler = notFoundHandler;
//# sourceMappingURL=error.middleware.js.map