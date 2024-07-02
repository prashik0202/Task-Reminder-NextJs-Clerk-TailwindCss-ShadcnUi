import Navbar from "@/components/Navbar";
import React from "react";

const DashBoradPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-col h-full justify-start">
      <Navbar />
      {children}
    </div>
  );
};

export default DashBoradPageLayout;
