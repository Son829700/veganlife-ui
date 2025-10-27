import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/others/Header";
import Footer from "../components/others/Footer";

export default function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
