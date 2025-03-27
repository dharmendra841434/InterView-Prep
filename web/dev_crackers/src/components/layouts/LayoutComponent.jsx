import React from "react";
import CustomHeader from "./CustomHeader";
import CustomFooter from "./CustomFooter";
const LayoutComponent = ({ children }) => {
  return (
    <div className=" max-w-[75rem] mx-auto">
      <CustomHeader />
      <div className=" pt-20 lg:pl-6 px-2 lg:px-0">{children}</div>
      <CustomFooter />
    </div>
  );
};

export default LayoutComponent;
