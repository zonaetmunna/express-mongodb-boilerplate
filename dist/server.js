"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_1 = require("./config/database");
const environment_1 = require("./config/environment");
const verifyEnv_1 = require("./config/verifyEnv");
const startServer = async () => {
    try {
        console.log('Starting server initialization...');
        console.log('Environment:', {
            NODE_ENV: process.env.NODE_ENV,
            PORT: process.env.PORT,
            hasMongoURI: !!process.env.MONGODB_URI,
            hasJWTSecret: !!process.env.JWT_SECRET,
            hasJWTRefreshSecret: !!process.env.JWT_REFRESH_SECRET
        });
        if (!(0, verifyEnv_1.verifyEnvironment)()) {
            throw new Error('Environment verification failed');
        }
        console.log('Attempting to connect to database...');
        await database_1.database.connect();
        console.log('Database connected successfully');
        const server = app_1.default.listen(environment_1.env.PORT, () => {
            console.log(`Server is running on port ${environment_1.env.PORT} in ${environment_1.env.NODE_ENV} mode`);
        });
        const shutdown = async () => {
            console.log('Shutting down server...');
            await database_1.database.disconnect();
            server.close(() => {
                console.log('Server closed');
                process.exit(0);
            });
        };
        process.on('SIGTERM', shutdown);
        process.on('SIGINT', shutdown);
    }
    catch (error) {
        console.error('Failed to start server. Error details:', {
            name: error instanceof Error ? error.name : 'Unknown',
            message: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined
        });
        process.exit(1);
    }
};
startServer();
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});
//# sourceMappingURL=server.js.map