"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import bcryptjs from "bcryptjs";

const Login = () => {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/login", user);
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        router.push("/profile");
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="bg-gradient-to-b from-blue-700 to-green-600 p-3 rounded-md flex flex-col">
        <h1 className="text-3xl font-semibold mb-3">
          {loading ? "Processing" : "Login"}
        </h1>
        <form onSubmit={handleLogin}>
          <div className="flex flex-col gap-2 mb-3">
            <label htmlFor="email">Email</label>
            <input
              className="bg-neutral-400 outline-none px-2 py-2 rounded-md text-black text-lg placeholder:text-neutral-700"
              type="text"
              name="email"
              id="email"
              value={user.email}
              placeholder="email"
              onChange={(e) => setUser({ ...user, ["email"]: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2 mb-3">
            <label htmlFor="password">Password</label>
            <input
              className="bg-neutral-400 outline-none px-2 py-2 rounded-md text-black text-lg placeholder:text-neutral-700"
              type="password"
              name="password"
              id="password"
              value={user.password}
              placeholder="password"
              onChange={(e) =>
                setUser({ ...user, ["password"]: e.target.value })
              }
            />
          </div>
          <button
            type="submit"
            className="p-2 rounded-sm text-white bg-gradient-to-r from-black to-gray-500"
          >
            Login
          </button>
        </form>
        <Link className="text-black underline " href="/signup">
          Sing up
        </Link>
      </div>
    </div>
  );
};

export default Login;
