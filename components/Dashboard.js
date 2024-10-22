"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { fetchUser, updateProfile } from "@/actions/useractions";
import { Bounce } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Dashboard = () => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({});
  useEffect(() => {
    if (!session) {
      router.push("/login");
    } else {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.name]);
  const getData = async () => {
    const username = session?.user?.name;
    let u = await fetchUser(username);
    setForm(u);
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (data) => {
    // update();
    let a = await updateProfile(data, session.user.name);
    toast("Profile Updated!", {
      position: "top-right",
      autoClose: 1000,
      limit: 1,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      draggable: true,
    });
  };
  return (
    <>
      <ToastContainer limit={1} draggable />
      <div className="container w-[87%] mx-auto sm:w-[75%] sm:mx-auto font-bold pt-12 align-middle">
        <h2 className="text-center mb-4">Welcome to your Dashboard</h2>
        <form className="text-white grid gap-2" action={handleSubmit}>
          <label
            htmlFor="name"
            className="block text-sm font-medium dark:text-white"
          >
            Name
          </label>
          <input
            className="shadow bg-gray-900 appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            name="name"
            id="name"
            type="text"
            value={form.name ? form.name : ""}
            onChange={handleChange}
          ></input>
          <label
            htmlFor="username"
            className="block text-sm font-medium dark:text-white"
          >
            userName
          </label>
          <input
            className="shadow bg-gray-900 appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            name="username"
            id="username"
            type="text"
            value={form.username ? form.username : ""}
            onChange={handleChange}
          ></input>
          <label
            htmlFor="email"
            className="block text-sm font-medium dark:text-white"
          >
            Email
          </label>
          <input
            className="shadow bg-gray-900 appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            name="email"
            id="email"
            type="email"
            value={form.email ? form.email : ""}
            onChange={handleChange}
          ></input>
          <label
            htmlFor="profilepic"
            className="block text-sm font-medium dark:text-white"
          >
            Profile Pic
          </label>
          <input
            className="shadow bg-gray-900 appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            id="profilepic"
            name="profilepic"
            type="text"
            value={form.profilepic ? form.profilepic : ""}
            onChange={handleChange}
          ></input>
          <label
            htmlFor="coverpic"
            className="block text-sm font-medium dark:text-white"
          >
            Cover Pic
          </label>
          <input
            className="shadow bg-gray-900 appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            name="coverpic"
            id="coverpic"
            type="text"
            value={form.coverpic ? form.coverpic : ""}
            onChange={handleChange}
          ></input>
          <label
            htmlFor="razorpayid"
            className="block text-sm font-medium dark:text-white"
          >
            Razorpayid
          </label>
          <input
            className="shadow bg-gray-900 appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            name="razorpayid"
            id="razorpayid"
            type="text"
            value={form.razorpayid ? form.razorpayid : ""}
            onChange={handleChange}
          ></input>
          <label
            htmlFor="razorpaysecret"
            className="block text-sm font-medium dark:text-white"
          >
            Razorpaysecret
          </label>
          <input
            className="shadow bg-gray-900 appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            name="razorpaysecret"
            id="razorpaysecret"
            type="password"
            value={form.razorpaysecret ? form.razorpaysecret : ""}
            onChange={handleChange}
          ></input>

          <button
            type="submit"
            className="w-full my-2 py-1 rounded-lg bg-cyan-400"
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default Dashboard;
