import mongoose from 'mongoose';
import { CONFIG } from './config';

export async function connectDB(): Promise<typeof mongoose | null> {
  if (!CONFIG.MONGODB_URI) {
    console.log('ℹ️  No MONGODB_URI configured. Running with in-memory resilient data store.');
    return null;
  }

  try {
    const conn = await mongoose.connect(CONFIG.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn('⚠️  MongoDB connection failed. Falling back to persistent in-memory data store.', (error as Error).message);
    return null;
  }
}
