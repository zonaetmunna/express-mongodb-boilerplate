"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEnvironment = verifyEnvironment;
const logger_1 = require("./logger");
function verifyEnvironment() {
    const requiredVars = [
        'NODE_ENV',
        'PORT',
        'MONGODB_URI',
        'JWT_SECRET',
        'JWT_REFRESH_SECRET'
    ];
    const missingVars = requiredVars.filter(varName => !process.env[varName]);
    if (missingVars.length > 0) {
        logger_1.logger.error('Missing required environment variables:', missingVars);
        return false;
    }
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri?.startsWith('mongodb://') && !mongoUri?.startsWith('mongodb+srv://')) {
        logger_1.logger.error('Invalid MongoDB URI format. Must start with mongodb:// or mongodb+srv://');
        return false;
    }
    logger_1.logger.info('Environment verification passed');
    return true;
}
//# sourceMappingURL=verifyEnv.js.map