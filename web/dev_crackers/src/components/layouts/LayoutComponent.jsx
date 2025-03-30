"use client";

import React from "react";
import CustomHeader from "./CustomHeader";
import CustomFooter from "./CustomFooter";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const LayoutComponent = ({ children }) => {
  const path = usePathname();

  //console.log(path, "sdngfhsd");
  // Create a client
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className=" max-w-[75rem] mx-auto">
        {path?.includes("admin") ? (
          <div className="  lg:pl-6 ">{children}</div>
        ) : (
          <>
            <CustomHeader />
            <div className=" pt-20 lg:pl-6 px-2 lg:px-0">{children}</div>
            <CustomFooter />
          </>
        )}
      </div>
    </QueryClientProvider>
  );
};

export default LayoutComponent;
