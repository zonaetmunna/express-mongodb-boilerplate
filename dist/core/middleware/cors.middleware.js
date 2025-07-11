"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsMiddleware = exports.corsOptions = void 0;
const config_1 = require("@/config");
const cors_1 = __importDefault(require("cors"));
exports.corsOptions = {
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true);
        if (config_1.env.CORS_ORIGIN === '*') {
            return callback(null, true);
        }
        const allowedOrigins = config_1.env.CORS_ORIGIN.split(',').map(origin => origin.trim());
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};
exports.corsMiddleware = (0, cors_1.default)(exports.corsOptions);
//# sourceMappingURL=cors.middleware.js.map