"use server";
import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
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
