import React from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { useAuthContext } from "../../context/AuthContext";
const SidebarCoach = ({ isOpen, setIsOpen }) => {
  const { logout, user } = useAuthContext();
  const navItems = [
    {
      label: "Dashboard",
      to: "/coach",
      icon: (
        <svg
          className="mr-3 h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <rect width="7" height="9" x="3" y="3" rx="1" />
          <rect width="7" height="5" x="14" y="3" rx="1" />
          <rect width="7" height="9" x="14" y="12" rx="1" />
          <rect width="7" height="5" x="3" y="16" rx="1" />
        </svg>
      ),
    },
    {
      label: "lịch huấn luyện",
      to: "/coach/sessions",
      icon: (
        <svg
          className="mr-3 h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <rect width="18" height="18" x="3" y="4" rx="2" />
          <path d="M3 10h18" />
        </svg>
      ),
    },
    {
      label: "Tin nhắn",
      to: "/coach/messages",
      icon: (
        <svg
          className="mr-3 h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          <path d="M10 9H8" />
          <path d="M16 13H8" />
          <path d="M16 17H8" />
        </svg>
      ),
    },
    {
      label: "Cài đặt",
      to: "/coach/settings",
      icon: (
        <svg
          className="mr-3 h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
  ];

  return (
    <div
      className={classNames(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out",
        {
          "translate-x-0": isOpen,
          "-translate-x-full": !isOpen,
          "lg:translate-x-0 lg:static lg:inset-0": true,
        }
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <img src="/veganlife-logo.png" className="h-12 w-50" />
        </div>
        <button
          className="lg:hidden text-gray-400 hover:text-gray-600"
          onClick={() => setIsOpen(false)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>

      {/* Danh sách liên kết */}
      <nav className="mt-8 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/coach"} 
            className={({ isActive }) =>
              classNames(
                "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                {
                  "bg-green-50 text-green-700 border-r-2 border-green-500": isActive,
                  "text-gray-600 hover:bg-gray-50 hover:text-gray-900": !isActive,
                }
              )
            }
          >
            {item.icon}
            {item.label}
          </NavLink>

        ))}
      </nav>

      {/* Tài khoản & Logout */}
      <div className="mt-8 pt-8 border-t border-gray-200 px-4">
        <div className="flex items-center py-2">
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-sm font-medium text-white">C</span>
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">{user?.fullName}</p>
            <p className="text-xs text-gray-500 capitalize">Coach</p>
          </div>
        </div>

        <button
          className="mt-2 w-full flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
          onClick={logout}
        >
          <svg
            className="mr-3 h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="m16 17 5-5-5-5" />
            <path d="M21 12H9" />
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          </svg>
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default SidebarCoach;
