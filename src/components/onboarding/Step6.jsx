import React from "react";

export default function Step6({ data, onChange, onNext, onPrevious }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Thanh tiến trình */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-500">Bước 6 trên 7</span>
          <span className="text-sm font-medium text-gray-500">Hoàn thành 86%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-emerald-500 to-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: "85.7143%" }}
          ></div>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        {/* Tiêu đề */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Thông tin cơ bản
          </h1>
          <p className="text-gray-600">Hãy tạo một tài khoản tại Vegan Life nhé !</p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Họ tên */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Họ và tên của bạn là gì?
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Nhập họ tên"
              value={data.fullName || ""}
              onChange={(e) => onChange("fullName", e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Địa chỉ email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Nhập email của bạn"
              value={data.email || ""}
              onChange={(e) => onChange("email", e.target.value)}
            />
          </div>

        </div>
      </div>

      {/* Nút điều hướng */}
      <div className="flex justify-between">
        <button
          onClick={onPrevious}
          className="flex items-center px-6 py-3 rounded-lg font-medium transition-colors duration-200 text-gray-700 hover:bg-gray-100"
        >
          {/* Mũi tên trái */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-left h-5 w-5 mr-2"
          >
            <path d="m12 19-7-7 7-7"></path>
            <path d="M19 12H5"></path>
          </svg>
          Trở lại
        </button>

        <button
          onClick={onNext}
          className="flex items-center px-6 py-3 rounded-lg font-medium transition-colors duration-200 bg-emerald-500 text-white hover:bg-emerald-600"
        >
          Tiếp tục
          {/* Mũi tên phải */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-right h-5 w-5 ml-2"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
