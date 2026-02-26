import { NextResponse } from "next/server";
import Payment from "@/app/models/Payment";
import User from "@/app/models/User";
import { connectDB } from "@/lib/db";
import Razorpay from "razorpay";
// Import the razorpay instance (you need to make sure this is correctly set up with your keys)
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";

// Create a Razorpay instance to access the utility function
const instance = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Use your actual key ID env variable name
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

export const POST = async (req) => {
  await connectDB();
  let body = await req.formData();
  body = Object.fromEntries(body);

  // Check if razorpayOrderId is present on the server
  let p = await Payment.findOne({ oid: body.razorpay_order_id });
  if (!p) {
    return NextResponse.json({ success: false, message: "Order Id not found" });
  }

  // fetch the secret of the user who is getting the payment
  let user = await User.findOne({ username: p.to_user });
  const secret = user.razorpaysecret;

  // Verify the payment
  let xx = validatePaymentVerification(
    { order_id: body.razorpay_order_id, payment_id: body.razorpay_payment_id },
    body.razorpay_signature,
    secret,
  );

  if (xx) {
    // Update the payment status
    const updatedPayment = await Payment.findOneAndUpdate(
      { oid: body.razorpay_order_id },
      { done: "true" },
      { new: true },
    );
    return (
      `${origin}/${updatedPayment.to_user}?paymentdone=true`,
      { status: 303 }
    );
  } else {
    return NextResponse.json({
      success: false,
      message: "Payment Verification Failed",
    });
  }
};
