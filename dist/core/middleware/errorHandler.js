"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_1 = require("../../config/logger");
const AppError_1 = require("../errors/AppError");
const errorHandler = (err, req, res, next) => {
    logger_1.logger.error(err.stack);
    if (err instanceof AppError_1.AppError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            status: 'error',
            message: err.message,
        });
    }
    if (err.name === 'MongoError' && err.code === 11000) {
        return res.status(400).json({
            status: 'error',
            message: 'Duplicate field value entered',
        });
    }
    return res.status(500).json({
        status: 'error',
        message: 'Something went wrong',
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map