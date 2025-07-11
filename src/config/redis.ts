import Redis from 'ioredis';
import { env } from './environment';
import { logger } from './logger';

export class RedisClient {
  private static instance: RedisClient;
  private client: Redis | null = null;

  private constructor() {}

  public static getInstance(): RedisClient {
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient();
    }
    return RedisClient.instance;
  }

  public async connect(): Promise<void> {
    if (this.client) {
      logger.warn('Redis client already exists');
      return;
    }

    try {
      this.client = new Redis(env.REDIS_URL || 'redis://localhost:6379', {
        password: env.REDIS_PASSWORD,
        retryStrategy: (times) => Math.min(times * 100, 3000),
        maxRetriesPerRequest: 3,
        lazyConnect: true,
      });

      this.client.on('connect', () => {
        logger.info('Redis connected successfully');
      });

      this.client.on('error', (error) => {
        logger.error('Redis connection error:', error);
      });

      this.client.on('close', () => {
        logger.warn('Redis connection closed');
      });

      await this.client.connect();
    } catch (error) {
      logger.error('Redis connection failed:', error);
      throw error;
    }
  }

  public getClient(): Redis {
    if (!this.client) {
      throw new Error('Redis client not initialized');
    }
    return this.client;
  }

  public async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.quit();
      this.client = null;
      logger.info('Redis disconnected successfully');
    }
  }
}

export const redisClient = RedisClient.getInstance();