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

  // Use a try-catch block for better error handling, but keep redirect outside it
  try {
    let body = await req.formData();
    body = Object.fromEntries(body);

    // Check if razorpayOrderId id is present on the server
    let p = await Payment.findOne({ oid: body.razorpay_order_id });
    if (!p) {
      return NextResponse.json(
        { success: false, message: "Order id not found" },
        { status: 404 },
      );
    }

    // Fetch the secret of user who is getting Payment
    // Note: The Razorpay secret should be the primary key, not a user specific one, as it validates the entire system's payments.
    const secret = process.env.RAZORPAY_SECRET_KEY;

    // Verify Payment using the imported utility from the instance
    // const { validatePaymentVerification } = require('./dist/utils/razorpay-utils'); // Access the utility
    let xx = validatePaymentVerification(
      {
        order_id: body.razorpay_order_id,
        payment_id: body.razorpay_payment_id,
      },
      body.razorpay_signature,
      secret,
    );

    if (xx) {
      // Update payment status
      const updatedPayment = await Payment.findOneAndUpdate(
        { oid: body.razorpay_order_id },
        { done: true },
        { new: true },
      );

      if (updatedPayment) {
        // Use req.headers.get('origin') to get the base URL on the server
        const origin = req.headers.get("origin");
        // Return a redirect with a 303 status for post requests
        return NextResponse.redirect(
          `${origin}/${updatedPayment.to_user}?paymentdone=true`,
          { status: 303 },
        );
      }
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Payment Verification Failed",
        },
        { status: 400 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
};
