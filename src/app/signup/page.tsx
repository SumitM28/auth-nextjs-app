"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

const Signup = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const onSignup = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/signup", {
        username: user.username,
        email: user.email,
        password: user.password,
      });
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        router.push("/login");
      } else {
        toast.error(data.message);
        // router.push("/api/auth/login");
      }
    } catch (error: any) {
      toast.error("Singup failed");
      // console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="bg-gradient-to-b from-blue-700 to-green-600 px-6 py-8 rounded-md flex flex-col">
        <h1 className="text-3xl font-semibold mb-3">
          {loading ? "Processing" : "Sing up"}
        </h1>
        <form action="">
          <div className="flex flex-col gap-2 mb-3">
            <label htmlFor="username">Username</label>
            <input
              className="bg-white outline-none px-2 py-2 rounded-md text-black text-lg placeholder:text-neutral-700"
              type="text"
              name="username"
              id="username"
              value={user.username}
              placeholder="username"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2 mb-3">
            <label htmlFor="email">Email</label>
            <input
              className="bg-white outline-none px-2 py-2 rounded-md text-black text-lg placeholder:text-neutral-700"
              type="text"
              name="email"
              id="email"
              value={user.email}
              placeholder="email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2 mb-3">
            <label htmlFor="password">Password</label>
            <input
              className="bg-white outline-none px-2 py-2 rounded-md text-black text-lg placeholder:text-neutral-700"
              type="password"
              name="password"
              id="password"
              value={user.password}
              placeholder="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <button
            className="p-2 rounded-md text-white bg-gradient-to-r from-black to-gray-500"
            onClick={(e) => onSignup(e)}
          >
            {buttonDisabled ? "No Singup" : "Singup"}
          </button>
        </form>
        <Link className="text-black underline " href="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
