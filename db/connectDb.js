"use server";
import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 20000,
    });
  } catch (error) {
    throw error; // Rethrow to be caught later
  }
};

export const getConnectionState = async () => {
  if (!mongoose.connection) {
    await connectDB();
  }
  return mongoose.connection.readyState;
};

export default connectDB;
