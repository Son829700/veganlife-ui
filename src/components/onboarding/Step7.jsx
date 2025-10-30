import React from "react";

export default function Step7({ onPrevious }) {

  const API_GOOGLE_LOGIN_URL = `${import.meta.env.VITE_API_URL}/identity/oauth2/authorization/google`;

  const handleGoogleLogin = () => {
    window.location.href = API_GOOGLE_LOGIN_URL;
  };



  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Progress */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-500">Bước 7 trên 7</span>
          <span className="text-sm font-medium text-gray-500">Hoàn thành 100%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-emerald-500 to-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: "100%" }}
          ></div>
        </div>
      </div>

      {/* Nội dung */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Kế hoạch cá nhân hóa của bạn</h1>
          <p className="text-gray-600">
            Dựa trên các câu trả lời của bạn, chúng tôi sẽ gửi đề xuất chương trình tới email của bạn!
          </p>
        </div>

        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-8">
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
              className="lucide lucide-check-circle h-12 w-12 text-white"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <path d="m9 11 3 3L22 4"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Chương trình tối ưu hóa</h2>
          <p className="text-lg text-gray-600 mb-8">
            Tinh chỉnh chế độ ăn thuần thực vật hiện tại của bạn để đạt hiệu quả cao hơn.
          </p>



          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center group"
              href="/coaching"
            >
              Cá nhân hóa với các huấn luyện viên
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
                className="lucide lucide-arrow-right ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </a>
            <button
              onClick={handleGoogleLogin}
              className="border-2 border-emerald-500 text-emerald-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-50 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              Đăng ký với Google
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google logo"
                className="w-5 h-5"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Điều hướng */}
      <div className="flex justify-between">
        <button
          onClick={onPrevious}
          className="flex items-center px-6 py-3 rounded-lg font-medium transition-colors duration-200 text-gray-700 hover:bg-gray-100"
        >
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
          Quay lại
        </button>

        <button
          disabled
          className="flex items-center px-6 py-3 rounded-lg font-medium transition-colors duration-200 text-gray-400 cursor-not-allowed"
        >
          Tiếp theo
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
