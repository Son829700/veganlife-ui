import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";




const LoginModal = ({ onClose }) => {

  const API_GOOGLE_LOGIN_URL = `${import.meta.env.VITE_API_URL}/oauth2/authorization/google`;

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthContext();

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(loginData.username, loginData.password);
      onClose();
    } catch (error) {
      console.error("Đăng nhập thất bại:", error);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = API_GOOGLE_LOGIN_URL;
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative transform transition-all duration-300 scale-100">
        {/* Nút đóng */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        {/* Logo và tiêu đề */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            Chào mừng bạn quay lại
          </h3>
          <p className="text-gray-600">
            Bắt đầu hành trình cùng{" "}
            <span className="font-semibold text-emerald-600">Vegan Life</span>
          </p>
        </div>

        {/* Form đăng nhập */}
        <form className="space-y-6" onSubmit={handleLoginSubmit}>
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên người dùng
            </label>
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-3 top-3 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <input
                type="text"
                name="username"
                placeholder="Nhập username"
                value={loginData.username}
                onChange={handleLoginChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-3 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Nhập mật khẩu"
              value={loginData.password}
              onChange={handleLoginChange}
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
              required
            />

            {/* Nút hiển thị/ẩn mật khẩu */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Nút đăng nhập */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Đăng nhập
          </button>

          {/* Google login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full border text-gray-700 bg-white py-3 rounded-xl font-medium text-sm hover:bg-gray-100 transition-all duration-200 flex items-center justify-center gap-3"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google logo"
              className="w-5 h-5"
            />
            Tiếp tục với Google
          </button>
        </form>

        {/* Chưa có tài khoản */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Chưa có tài khoản?{" "}
            <a
              href="/onboarding"
              className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline"
            >
              Đăng ký ngay
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
