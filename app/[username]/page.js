/* eslint-disable react/no-unescaped-entities */
import React from "react";
import PaymentPage from "@/components/PaymentPage";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";

import User from "../models/User";
const Username = async ({ params }) => {
  // if username is not present in database show, 404
  const checkUser = async () => {
    await connectDB();
    let u = await User.findOne({ username: params.username });
    u = JSON.parse(JSON.stringify(u));
    if (!u) {
      return notFound();
    }
  };
  await checkUser();
  const username = decodeURI(params.username);
  return <PaymentPage username={username} />;
};

export default Username;
