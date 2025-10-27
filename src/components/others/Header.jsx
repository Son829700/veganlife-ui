import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LoginModal from "../../pages/login/LoginModal";

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthContext() || {};
  const navigate = useNavigate();


  const handleClick = () => {
    if (user) {
      if (user.plan === "PREMIUM") {
        navigate("/coaching-dashboard");
      } else {
        navigate("/coaching");
      }
    } else {
      setShowLogin(true);
    }
  };

  return (
    <>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-1 rounded-lg overflow-hidden">
                <img
                  src="/veganlife-logo.png"
                  alt="Vegan Life Logo"
                  className="h-12 w-auto object-contain"
                />
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link text-emerald-600 font-semibold" : "nav-link"
                }
              >
                Trang chủ
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "nav-link text-emerald-600 font-semibold" : "nav-link"
                }
              >
                Giới thiệu
              </NavLink>
              {(!user || user?.plan === "FREE") && (
                <NavLink
                  to="/coaching"
                  className={({ isActive }) =>
                    isActive ? "nav-link text-emerald-600 font-semibold" : "nav-link"
                  }
                >
                  Giải pháp
                </NavLink>
              )}
              <NavLink
                to="/resources"
                className={({ isActive }) =>
                  isActive ? "nav-link text-emerald-600 font-semibold" : "nav-link"
                }
              >
                Thư viện
              </NavLink>

              {/* Cộng đồng luôn hiển thị */}
              <NavLink
                to="/community"
                className={({ isActive }) =>
                  isActive ? "nav-link text-emerald-600 font-semibold" : "nav-link"
                }
              >
                Cộng đồng
              </NavLink>

              {/* Bảng điều khiển chỉ hiện khi đăng nhập, và đặt cuối */}
              {user && (
                <NavLink
                  to="/coaching-dashboard"
                  className={({ isActive }) =>
                    isActive ? "nav-link text-emerald-600 font-semibold" : "nav-link"
                  }
                >
                  Bảng điều khiển
                </NavLink>
              )}

              <button
                onClick={handleClick}
                className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-xl transform transition-all duration-500 ease-in-out hover:scale-110 hover:-translate-y-1"
              >
                Bắt đầu hành trình
              </button>
            </div>


            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300 ease-in-out"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                // Icon close
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Icon menu
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="flex flex-col space-y-4 px-4 py-6">
            <Link to="/" className="mobile-link">Trang chủ</Link>
            <Link to="/about" className="mobile-link">Giới thiệu</Link>
            <Link to="/resources" className="mobile-link">Tài nguyên</Link>
            <Link to="/coaching" className="mobile-link">Hướng dẫn</Link>
            <Link to="/community" className="mobile-link">Cộng đồng</Link>

            {/* Bảng điều khiển chỉ hiện khi đăng nhập */}
            {user && (
              <Link to="/coaching-dashboard" className="mobile-link">
                Bảng điều khiển
              </Link>
            )}

            <Link
              to="/onboarding"
              className="w-full text-center bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-lg text-sm font-medium shadow-md hover:shadow-xl transform transition-all duration-500 ease-in-out hover:scale-105"
            >
              Bắt đầu hành trình
            </Link>
          </div>

        )}
      </nav>
    </>
  );
}
