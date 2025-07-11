"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = exports.RedisClient = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const environment_1 = require("./environment");
const logger_1 = require("./logger");
class RedisClient {
    static instance;
    client = null;
    constructor() { }
    static getInstance() {
        if (!RedisClient.instance) {
            RedisClient.instance = new RedisClient();
        }
        return RedisClient.instance;
    }
    async connect() {
        if (this.client) {
            logger_1.logger.warn('Redis client already exists');
            return;
        }
        try {
            this.client = new ioredis_1.default(environment_1.env.REDIS_URL || 'redis://localhost:6379', {
                password: environment_1.env.REDIS_PASSWORD,
                retryStrategy: (times) => Math.min(times * 100, 3000),
                maxRetriesPerRequest: 3,
                lazyConnect: true,
            });
            this.client.on('connect', () => {
                logger_1.logger.info('Redis connected successfully');
            });
            this.client.on('error', (error) => {
                logger_1.logger.error('Redis connection error:', error);
            });
            this.client.on('close', () => {
                logger_1.logger.warn('Redis connection closed');
            });
            await this.client.connect();
        }
        catch (error) {
            logger_1.logger.error('Redis connection failed:', error);
            throw error;
        }
    }
    getClient() {
        if (!this.client) {
            throw new Error('Redis client not initialized');
        }
        return this.client;
    }
    async disconnect() {
        if (this.client) {
            await this.client.quit();
            this.client = null;
            logger_1.logger.info('Redis disconnected successfully');
        }
    }
}
exports.RedisClient = RedisClient;
exports.redisClient = RedisClient.getInstance();
//# sourceMappingURL=redis.js.map