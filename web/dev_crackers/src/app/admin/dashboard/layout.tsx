"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const handleNavigation = (path: any) => {
    setSidebarOpen(false);
    router.push(path);
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out bg-gray-900 w-64 p-5 shadow-lg md:relative md:translate-x-0`}
      >
        <div className="flex justify-between items-center mb-6">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center "
          >
            <img
              src="/logo1.webp"
              className=" w-14 h-14 md:h-20 md:w-20"
              alt="Logo"
            />
            <div>
              <h1 className="text-xl md:text-3xl font-bold">Dev Cracker</h1>
              <p className="text-gray-400 font-light text-xs">
                Crack your dream job with us
              </p>
            </div>
          </motion.div>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <FiX size={24} />
          </button>
        </div>
        <nav>
          <ul>
            <li
              onClick={() => handleNavigation("/admin/dashboard/")}
              className="block p-2 mb-4 text-gray-700 hover:bg-gray-200 rounded"
            >
              Dashboard
            </li>
            <li
              onClick={() => handleNavigation("/admin/dashboard/articles")}
              className="block p-2 text-gray-700 hover:bg-gray-200 rounded"
            >
              Articles
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-gray-900 shadow-2xl p-4 flex justify-between items-center">
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <FiMenu size={24} />
          </button>
          <h2 className="text-lg font-semibold">Admin Dashboard</h2>
          <button
            onClick={() => router.push("/admin/login")}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
