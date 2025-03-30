"use client";

import { useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { FiMenu, FiX } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Bell, Search } from "lucide-react";
import { adminNav } from "@/constant/adminNav";
import Cookies from "js-cookie";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path: any) => {
    setSidebarOpen(false);
    router.push(path);
  };

  const handleLogout = () => {
    Cookies.remove("accessToken");
    router.push("/admin/login");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 bg-[#0f0919]  shadow-lg w-64 p-5 transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <img
              src="/logo1.webp"
              className="w-14 h-14 md:h-20 md:w-20"
              alt="Logo"
            />
            <div className="text-center">
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
            {adminNav.map((nav) => (
              <li
                key={nav.title}
                onClick={() => handleNavigation(nav.path)}
                className={`block p-2 text-gray-700 hover:bg-gray-200 ${
                  pathname == nav.path.toLocaleLowerCase()
                    ? "text-white"
                    : "bg-transparent"
                } rounded cursor-pointer`}
              >
                {nav.title}
              </li>
            ))}
          </ul>
          <button className=" absolute bottom-10 ">
            <div className=" flex items-center space-x-2 text-gray-400">
              <p>Logout</p>
              <HiOutlineLogout
                onClick={handleLogout}
                className=" transition-all duration-300 ease-in-out hover:scale-125 cursor-pointer "
              />
            </div>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        {/* Topbar */}
        <header className="flex items-center justify-between px-6 py-4  shadow-md w-full">
          <div className="md:hidden w-full">
            <div className=" flex flex-row items-center justify-between">
              <button
                className="md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <FiMenu size={24} />
              </button>
              <div className=" h-12 w-12 rounded-full bg-orange-300"></div>
            </div>
          </div>
          <h2 className="text-lg font-semibold hidden md:block">
            Welcome back!
          </h2>
          <div className=" hidden md:block">
            <div className="md:flex gap-4 items-center  ">
              <div className="relative">
                <Search className="absolute left-2 top-2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  className="pl-8 p-2 border rounded-md w-32 sm:w-64"
                  placeholder="Search..."
                />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
