"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalRateLimit = exports.authRateLimit = exports.createRateLimit = void 0;
const config_1 = require("@/config");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const createRateLimit = (windowMs, max) => {
    return (0, express_rate_limit_1.default)({
        windowMs: windowMs || config_1.env.RATE_LIMIT_WINDOW_MS,
        max: max || config_1.env.RATE_LIMIT_MAX_REQUESTS,
        message: {
            success: false,
            message: 'Too many requests from this IP, please try again later.',
        },
        standardHeaders: true,
        legacyHeaders: false,
    });
};
exports.createRateLimit = createRateLimit;
exports.authRateLimit = (0, exports.createRateLimit)(15 * 60 * 1000, 5);
exports.generalRateLimit = (0, exports.createRateLimit)();
//# sourceMappingURL=rateLimit.middleware.js.map