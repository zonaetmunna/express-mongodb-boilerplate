import { logger } from './logger';

export function verifyEnvironment() {
  const requiredVars = [
    'NODE_ENV',
    'PORT',
    'MONGODB_URI',
    'JWT_SECRET',
    'JWT_REFRESH_SECRET'
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    logger.error('Missing required environment variables:', missingVars);
    return false;
  }

  // Verify MongoDB URI format
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri?.startsWith('mongodb://') && !mongoUri?.startsWith('mongodb+srv://')) {
    logger.error('Invalid MongoDB URI format. Must start with mongodb:// or mongodb+srv://');
    return false;
  }

  logger.info('Environment verification passed');
  return true;
} 