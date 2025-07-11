"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeServerHeader = exports.securityMiddleware = void 0;
const helmet_1 = __importDefault(require("helmet"));
exports.securityMiddleware = (0, helmet_1.default)({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
});
const removeServerHeader = (req, res, next) => {
    res.removeHeader('X-Powered-By');
    next();
};
exports.removeServerHeader = removeServerHeader;
//# sourceMappingURL=security.middleware.js.map