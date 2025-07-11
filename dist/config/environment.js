"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTest = exports.isDevelopment = exports.isProduction = exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'production', 'test']).default('development'),
    PORT: zod_1.z.string().transform(Number).default('3000'),
    API_VERSION: zod_1.z.string().default('v1'),
    MONGODB_URI: zod_1.z.string(),
    MONGODB_TEST_URI: zod_1.z.string().optional(),
    REDIS_URL: zod_1.z.string().optional(),
    REDIS_PASSWORD: zod_1.z.string().optional(),
    JWT_SECRET: zod_1.z.string(),
    JWT_EXPIRES_IN: zod_1.z.string().default('7d'),
    JWT_REFRESH_SECRET: zod_1.z.string(),
    JWT_REFRESH_EXPIRES_IN: zod_1.z.string().default('30d'),
    SMTP_HOST: zod_1.z.string().optional(),
    SMTP_PORT: zod_1.z.string().transform(Number).optional(),
    SMTP_USER: zod_1.z.string().optional(),
    SMTP_PASS: zod_1.z.string().optional(),
    FROM_EMAIL: zod_1.z.string().optional(),
    FROM_NAME: zod_1.z.string().optional(),
    BCRYPT_ROUNDS: zod_1.z.string().transform(Number).default('12'),
    RATE_LIMIT_WINDOW_MS: zod_1.z.string().transform(Number).default('900000'),
    RATE_LIMIT_MAX_REQUESTS: zod_1.z.string().transform(Number).default('100'),
    CORS_ORIGIN: zod_1.z.string().default('*'),
    LOG_LEVEL: zod_1.z.enum(['error', 'warn', 'info', 'debug']).default('info'),
});
exports.env = envSchema.parse(process.env);
exports.isProduction = exports.env.NODE_ENV === 'production';
exports.isDevelopment = exports.env.NODE_ENV === 'development';
exports.isTest = exports.env.NODE_ENV === 'test';
//# sourceMappingURL=environment.js.map