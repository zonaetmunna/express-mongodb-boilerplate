import app from './app';
import { database } from './config/database';
import { env } from './config/environment';
import { verifyEnvironment } from './config/verifyEnv';

const startServer = async () => {
  try {
    // Log startup information
    console.log('Starting server initialization...');
    console.log('Environment:', {
      NODE_ENV: env.NODE_ENV,
      PORT: env.PORT,
      hasMongoURI: !!env.MONGODB_URI,
      hasJWTSecret: !!env.JWT_SECRET,
      hasJWTRefreshSecret: !!env.JWT_REFRESH_SECRET,
    });

    // Verify environment variables
    if (!verifyEnvironment()) {
      throw new Error('Environment verification failed');
    }

    // Connect to database
    console.log('Attempting to connect to database...');
    await database.connect();
    console.log('Database connected successfully');

    // Start server
    const server = app.listen(env.PORT, () => {
      console.log(
        `Server is running on port ${env.PORT} in ${env.NODE_ENV} mode`
      );
    });

    // Handle graceful shutdown
    const shutdown = async () => {
      console.log('Shutting down server...');
      await database.disconnect();
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (error) {
    // Enhanced error logging
    console.error('Failed to start server. Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });

    process.exit(1);
  }
};

startServer();

// Add unhandled rejection handler
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Add uncaught exception handler
process.on('uncaughtException', error => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});
