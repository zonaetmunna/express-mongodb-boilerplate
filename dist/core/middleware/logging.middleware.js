"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggingMiddleware = void 0;
const config_1 = require("@/config");
const morgan_1 = __importDefault(require("morgan"));
morgan_1.default.token('response-time', (req, res) => {
    const responseTime = res.getHeader('X-Response-Time');
    return responseTime ? `${responseTime}ms` : '';
});
const stream = {
    write: (message) => {
        config_1.logger.info(message.trim());
    },
};
exports.loggingMiddleware = (0, morgan_1.default)(config_1.env.NODE_ENV === 'production'
    ? 'combined'
    : ':method :url :status :res[content-length] - :response-time ms', { stream });
//# sourceMappingURL=logging.middleware.js.map