"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin/login");
  }, []);

  return <div></div>;
};

export default AdminPage;
