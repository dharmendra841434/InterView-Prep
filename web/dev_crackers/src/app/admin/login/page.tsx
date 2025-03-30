"use client";
import useLoginAdmin from "@/hooks/useAdminLogin";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const { loginAdmin, isLoading } = useLoginAdmin();

  const handleLogin = (e: any) => {
    e.preventDefault();
    loginAdmin({
      adminUsername: username,
      password: password,
    });
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Admin Login
        </h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1 placeholder:text-gray-500 text-black"
              value={username}
              placeholder="admin-username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded mt-1 placeholder:text-gray-500 text-black"
              value={password}
              placeholder="admin-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {isLoading ? "Loging..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
