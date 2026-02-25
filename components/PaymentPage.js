"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchUser, fetchPayments, initiate } from "@/actions/useractions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentPage = ({ username }) => {
  const [paymentForm, setPaymentForm] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [payments, setPayments] = useState([]);
  const sp = useSearchParams();

  useEffect(() => {
    loadData();
    if (sp.get("paymentdone") === "true") {
      toast.success("Thanks for the donation 🤍", {
        autoClose: 1500,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    const u = await fetchUser(username);
    setCurrentUser(u);
    const p = await fetchPayments(username);
    setPayments(p);
  };

  const handleChange = (e) => {
    setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value });
  };

  const pay = async (amount) => {
    if (typeof window.Razorpay === "undefined") {
      toast.error("Razorpay is still loading. Please wait.");
      return;
    }
    const order = await initiate(amount, username, paymentForm);

    const rzp = new Razorpay({
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount,
      currency: "INR",
      name: "GetMeAChai",
      order_id: order.id,
      callback_url: `${window.location.origin}/api/razorpay`,
      theme: { color: "#00e0ff" },
    });

    rzp.open();
  };

  return (
    <>
      <ToastContainer />
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="bg-[#06080f] min-h-screen text-white pb-20">
        {/* FULL SCREEN COVER */}
        <div className="relative w-full h-72 md:h-[55vh]">
          <Image
            src={currentUser.coverpic}
            alt="Cover"
            fill
            className="object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#06080f]" />
        </div>

        {/* PROFILE PIC */}
        <div className="relative -mt-20 text-center z-10">
          <Image
            src={currentUser.profilepic}
            alt="Profile"
            width={150}
            height={150}
            className="rounded-full border-4 border-cyan-400 shadow-[0_0_30px_#00e0ff] mx-auto"
          />
        </div>

        {/* NAME + STATS */}
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold text-cyan-400">
            Let’s help {username} get a chai ☕
          </h2>
          <p className="mt-2 text-gray-400">
            💙 {payments.length} supporters • ₹
            {payments.reduce((a, b) => a + b.amount, 0)} raised 🎉
          </p>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[90%] md:w-[70%] mx-auto mt-10">
          {/* SUPPORTERS CARD */}
          <div className="bg-[#101522] rounded-2xl p-6 shadow-lg border border-[#1f2a3a] backdrop-blur-md hover:border-cyan-400 transition">
            <h3 className="text-lg font-semibold text-cyan-400 mb-3">
              Supporters 🫶
            </h3>
            <ul className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
              {payments.length === 0 && (
                <p className="text-gray-600">Be the first supporter ✨</p>
              )}
              {payments.map((p, idx) => (
                <li
                  key={idx}
                  className="bg-[#181d2d] p-3 rounded-lg border border-[#24314a]"
                >
                  <strong className="text-cyan-300">{p.name}</strong> donated ₹
                  {p.amount}
                  {p.message && (
                    <p className="text-xs text-gray-400">{p.message}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* PAYMENT CARD */}
          <div className="bg-[#101522] rounded-2xl p-6 shadow-lg border border-[#1f2a3a] backdrop-blur-md hover:border-cyan-400 transition">
            <h3 className="text-lg font-semibold text-cyan-400 mb-3">
              Make a Payment 💳
            </h3>

            <input
              name="name"
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 mb-2 bg-[#1b2030] rounded-md border border-[#2d3a54]"
            />
            <input
              name="message"
              onChange={handleChange}
              placeholder="Message (optional)"
              className="w-full p-3 mb-2 bg-[#1b2030] rounded-md border border-[#2d3a54]"
            />
            <input
              name="amount"
              type="number"
              onChange={handleChange}
              placeholder="Amount (₹)"
              className="w-full p-3 mb-4 bg-[#1b2030] rounded-md border border-[#2d3a54]"
            />

            <button
              disabled={!paymentForm.amount}
              onClick={() => pay(paymentForm.amount * 100)}
              className="w-full p-3 bg-cyan-400 text-black font-bold rounded-md hover:bg-cyan-300 disabled:bg-gray-600 disabled:cursor-not-allowed transition"
            >
              Don’t think, just chai! 😄
            </button>

            {/* Quick Pay Buttons */}
            <div className="flex justify-center gap-3 mt-4">
              {[10, 20, 50].map((amt) => (
                <button
                  key={amt}
                  onClick={() => pay(amt * 100)}
                  className="py-2 px-4 bg-[#181d2d] rounded-md border border-[#24314a] hover:bg-cyan-400 hover:text-black transition"
                >
                  ₹{amt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
