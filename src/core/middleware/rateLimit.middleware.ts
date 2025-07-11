import { env } from '@/config';
import rateLimit from 'express-rate-limit';

export const createRateLimit = (windowMs?: number, max?: number) => {
  return rateLimit({
    windowMs: windowMs || env.RATE_LIMIT_WINDOW_MS,
    max: max || env.RATE_LIMIT_MAX_REQUESTS,
    message: {
      success: false,
      message: 'Too many requests from this IP, please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

export const authRateLimit = createRateLimit(15 * 60 * 1000, 5); // 5 attempts per 15 minutes
export const generalRateLimit = createRateLimit();