import { Navbar } from "@/components/layout/Navbar";
import React from "react";

function CommonLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default CommonLayout;
