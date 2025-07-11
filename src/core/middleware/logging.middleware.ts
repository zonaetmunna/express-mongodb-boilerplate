import { env, logger } from '@/config';
import morgan from 'morgan';

// Custom token for response time
morgan.token('response-time', (req, res) => {
  const responseTime = res.getHeader('X-Response-Time');
  return responseTime ? `${responseTime}ms` : '';
});

const stream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

export const loggingMiddleware = morgan(
  env.NODE_ENV === 'production'
    ? 'combined'
    : ':method :url :status :res[content-length] - :response-time ms',
  { stream }
);
