import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SidebarCoach from "../components/coach/SidebarCoach";

const CoachLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SidebarCoach isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Nội dung chính */}
      <div className="flex-1 flex flex-col">
        {/* Header chỉ hiển thị trên màn hình nhỏ */}
        <header className="bg-white shadow-sm border-b border-gray-200 lg:hidden">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              className="text-gray-400 hover:text-gray-600"
              onClick={() => setSidebarOpen(true)}
            >
              {/* Nút mở menu */}
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M4 12h16" />
                <path d="M4 18h16" />
                <path d="M4 6h16" />
              </svg>
            </button>

            <div className="flex items-center space-x-2">
              <img src="/veganlife-logo.png" className="h-12 w-50" />

            </div>
          </div>
        </header>

        {/* Nội dung từ router */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CoachLayout;
