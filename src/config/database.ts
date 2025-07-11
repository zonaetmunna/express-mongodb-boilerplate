import mongoose from 'mongoose';
import { env } from './environment';
import { logger } from './logger';

export class Database {
  private static instance: Database;
  private isConnected = false;

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect(): Promise<void> {
    if (this.isConnected) {
      logger.warn('Database already connected');
      return;
    }

    try {
      const uri = env.NODE_ENV === 'test' ? env.MONGODB_TEST_URI : env.MONGODB_URI;
      
      logger.info('Attempting to connect to MongoDB...');
      logger.debug(`MongoDB URI: ${uri}`);
      
      await mongoose.connect(uri!, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 45000,
        connectTimeoutMS: 30000,
      });

      this.isConnected = true;
      logger.info('Database connected successfully');

      mongoose.connection.on('error', (error) => {
        logger.error('Database connection error:', error);
      });

      mongoose.connection.on('disconnected', () => {
        logger.warn('Database disconnected');
        this.isConnected = false;
      });

    } catch (error) {
      logger.error('Database connection failed:', error);
      if (error instanceof Error) {
        logger.error('Error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack
        });
      }
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      return;
    }

    try {
      await mongoose.disconnect();
      this.isConnected = false;
      logger.info('Database disconnected successfully');
    } catch (error) {
      logger.error('Database disconnection failed:', error);
      throw error;
    }
  }

  public getConnectionStatus(): boolean {
    return this.isConnected;
  }
}

export const database = Database.getInstance();