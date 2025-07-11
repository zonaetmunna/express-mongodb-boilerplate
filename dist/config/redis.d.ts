import Redis from 'ioredis';
export declare class RedisClient {
    private static instance;
    private client;
    private constructor();
    static getInstance(): RedisClient;
    connect(): Promise<void>;
    getClient(): Redis;
    disconnect(): Promise<void>;
}
export declare const redisClient: RedisClient;
//# sourceMappingURL=redis.d.ts.map