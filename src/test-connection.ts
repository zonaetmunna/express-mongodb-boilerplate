import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

async function testConnection() {
  try {
    const uri = process.env.MONGODB_URI;
    console.log('Testing MongoDB connection...');
    console.log('URI format check:', uri?.startsWith('mongodb://') || uri?.startsWith('mongodb+srv://'));
    
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log('Successfully connected to MongoDB!');
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Connection test failed:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
  }
}

testConnection(); 