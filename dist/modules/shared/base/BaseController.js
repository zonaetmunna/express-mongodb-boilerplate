"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const utils_1 = require("@/core/utils");
class BaseController {
    sendSuccess(res, data, message = 'Success', statusCode = 200) {
        return utils_1.ApiResponse.success(res, data, message, statusCode);
    }
    sendError(res, message = 'An error occurred', statusCode = 500) {
        return utils_1.ApiResponse.error(res, message, statusCode);
    }
    sendCreated(res, data, message = 'Created successfully') {
        return utils_1.ApiResponse.created(res, data, message);
    }
    sendNotFound(res, message = 'Resource not found') {
        return utils_1.ApiResponse.notFound(res, message);
    }
    sendBadRequest(res, message = 'Bad request') {
        return utils_1.ApiResponse.badRequest(res, message);
    }
    sendUnauthorized(res, message = 'Unauthorized') {
        return utils_1.ApiResponse.unauthorized(res, message);
    }
    sendForbidden(res, message = 'Forbidden') {
        return utils_1.ApiResponse.forbidden(res, message);
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=BaseController.js.map