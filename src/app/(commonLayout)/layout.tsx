import { Navbar } from "@/components/layout/Navbar";
import React from "react";

function CommonLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-16 md:pt-20">{children}</main>
    </>
  );
}

export default CommonLayout;
