import mongoose from 'mongoose';

// Disable query buffering so queries fail quickly with helpful messages instead of hanging indefinitely if DB is disconnected
mongoose.set('bufferCommands', false);

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/khan_sher_portfolio';
  
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`[MongoDB Warning] Could not connect to: ${uri}`);
    console.warn(`[MongoDB Note] To persist data in MongoDB, start your local mongod or set MONGODB_URI (e.g. MongoDB Atlas) in backend/.env`);
    return null;
  }
};
