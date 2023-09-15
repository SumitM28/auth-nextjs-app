"use client";
import React from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
const Profile = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const { data } = await axios.get("/api/auth/logout");
      if (data.success) {
        toast.success(data.message);
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1 className="text-2xl">Profile</h1>
      <br />
      <p className="text-4xl ">Profile page</p>
      <button
        className="bg-blue-500 px-3 py-2 mt-4 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
