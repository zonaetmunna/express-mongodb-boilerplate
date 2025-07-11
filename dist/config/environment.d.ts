export declare const env: {
    NODE_ENV: "development" | "production" | "test";
    PORT: number;
    API_VERSION: string;
    MONGODB_URI: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    JWT_REFRESH_SECRET: string;
    JWT_REFRESH_EXPIRES_IN: string;
    BCRYPT_ROUNDS: number;
    RATE_LIMIT_WINDOW_MS: number;
    RATE_LIMIT_MAX_REQUESTS: number;
    CORS_ORIGIN: string;
    LOG_LEVEL: "error" | "warn" | "info" | "debug";
    MONGODB_TEST_URI?: string | undefined;
    REDIS_URL?: string | undefined;
    REDIS_PASSWORD?: string | undefined;
    SMTP_HOST?: string | undefined;
    SMTP_PORT?: number | undefined;
    SMTP_USER?: string | undefined;
    SMTP_PASS?: string | undefined;
    FROM_EMAIL?: string | undefined;
    FROM_NAME?: string | undefined;
};
export declare const isProduction: boolean;
export declare const isDevelopment: boolean;
export declare const isTest: boolean;
//# sourceMappingURL=environment.d.ts.map