"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = exports.Database = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const environment_1 = require("./environment");
const logger_1 = require("./logger");
class Database {
    static instance;
    isConnected = false;
    constructor() { }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
    async connect() {
        if (this.isConnected) {
            logger_1.logger.warn('Database already connected');
            return;
        }
        try {
            const uri = environment_1.env.NODE_ENV === 'test' ? environment_1.env.MONGODB_TEST_URI : environment_1.env.MONGODB_URI;
            logger_1.logger.info('Attempting to connect to MongoDB...');
            logger_1.logger.debug(`MongoDB URI: ${uri}`);
            await mongoose_1.default.connect(uri, {
                maxPoolSize: 10,
                serverSelectionTimeoutMS: 30000,
                socketTimeoutMS: 45000,
                connectTimeoutMS: 30000,
            });
            this.isConnected = true;
            logger_1.logger.info('Database connected successfully');
            mongoose_1.default.connection.on('error', (error) => {
                logger_1.logger.error('Database connection error:', error);
            });
            mongoose_1.default.connection.on('disconnected', () => {
                logger_1.logger.warn('Database disconnected');
                this.isConnected = false;
            });
        }
        catch (error) {
            logger_1.logger.error('Database connection failed:', error);
            if (error instanceof Error) {
                logger_1.logger.error('Error details:', {
                    name: error.name,
                    message: error.message,
                    stack: error.stack
                });
            }
            throw error;
        }
    }
    async disconnect() {
        if (!this.isConnected) {
            return;
        }
        try {
            await mongoose_1.default.disconnect();
            this.isConnected = false;
            logger_1.logger.info('Database disconnected successfully');
        }
        catch (error) {
            logger_1.logger.error('Database disconnection failed:', error);
            throw error;
        }
    }
    getConnectionStatus() {
        return this.isConnected;
    }
}
exports.Database = Database;
exports.database = Database.getInstance();
//# sourceMappingURL=database.js.map