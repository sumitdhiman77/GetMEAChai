"use server";
import Razorpay from "razorpay";
import Payment from "@/app/models/Payment";
import { connectDB } from "@/lib/db";
import User from "@/app/models/User";

export const initiate = async (amount, to_username, paymentForm) => {
  try {
    await connectDB();
    // fetch the secret of user who is getting Payment
    let user = await User.findOne({ username: to_username });
    user = JSON.parse(JSON.stringify(user));
    var instance = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });
  } catch (error) {
    throw new Error("Database connection failed");
  }

  let options = {
    amount: Number.parseInt(amount),
    currency: "INR",
  };
  let x = await instance.orders.create(options);
  // create a payment object which shows a pending payment in the database
  await Payment.create({
    oid: x.id,
    amount: amount / 100,
    to_user: to_username,
    name: paymentForm.name,
    message: paymentForm.message,
  });
  return x;
};
export const fetchUser = async (username) => {
  try {
    await connectDB();
    let user = await User.findOne({ username: username });
    user = JSON.parse(JSON.stringify(user));
    if (!user) {
      return null; // or throw an error if you prefer
    }
    return user;
  } catch (error) {
    throw new Error("Failed to fetch user");
  }
};
export const fetchPayments = async (username) => {
  await connectDB();
  let p = await Payment.find({ to_user: username, done: true })
    .sort({ createdAt: -1 })
    .limit(10);
  p = JSON.parse(JSON.stringify(p));
  return p;
};

export const updateProfile = async (data, oldUsername) => {
  await connectDB();
  const ndata = Object.fromEntries(data);
  // ? if the username is being updated check if username is available
  if (oldUsername !== ndata.username) {
    let u = await User.findOne({ username: ndata.username });
    u = JSON.parse(JSON.stringify(u));
    if (u) {
      return { error: "username is already exist" };
    }
    await User.updateOne({ email: ndata.email }, ndata);
    // now update all username in payments table
    await Payment.updateMany(
      { to_user: oldUsername },
      { to_user: ndata.username }
    );
  }
  let a = await User.updateOne({ email: ndata.email }, ndata);
  return a;
};
