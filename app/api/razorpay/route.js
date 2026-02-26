import { NextResponse } from "next/server";
import Payment from "@/app/models/Payment";
import { connectDB } from "@/lib/db";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";

export const POST = async (req) => {
  try {
    await connectDB();
    let body = await req.formData();
    body = Object.fromEntries(body);

    const payment = await Payment.findOne({
      oid: body.razorpay_order_id,
    });
    console.log("payment is:", payment);
    if (!payment) {
      return NextResponse.json(
        { success: false, message: "Order Id not found" },
        { status: 404 },
      );
    }

    const secret = process.env.RAZORPAY_SECRET_KEY;

    const isValid = validatePaymentVerification(
      {
        order_id: body.razorpay_order_id,
        payment_id: body.razorpay_payment_id,
      },
      body.razorpay_signature,
      secret,
    );

    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Payment Verification Failed" },
        { status: 400 },
      );
    }

    const updatedPayment = await Payment.findOneAndUpdate(
      { oid: body.razorpay_order_id },
      { done: true },
      { new: true },
    );

    const origin = req.headers.get("origin");

    return NextResponse.redirect(
      `${origin}/${updatedPayment.to_user}?paymentdone=true`,
      { status: 303 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
};
