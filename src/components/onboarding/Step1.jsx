import React from "react";

export default function Step1({ onNext }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Thanh tiến trình */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-500">Bước 1 trên 7</span>
          <span className="text-sm font-medium text-gray-500">Hoàn thành 14%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-emerald-500 to-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: "14.2857%" }}
          ></div>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        {/* Tiêu đề */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Chào mừng đến với Vegan Life
          </h1>
          <p className="text-gray-600">
            Hãy để chúng tôi hiểu rõ hơn về bạn để cá nhân hóa hành trình của bạn.
          </p>
        </div>

        {/* Nội dung giữa */}
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            {/* Icon check */}
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Bắt đầu hành trình sống xanh của bạn!
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Chúng tôi rất vui được đồng hành cùng bạn khám phá lợi ích và niềm vui của lối sống thuần thực vật. Bài khảo sát nhanh này sẽ giúp chúng tôi tạo ra trải nghiệm phù hợp với bạn.
          </p>
          <p className="text-gray-600">
            Chỉ mất 3–5 phút để hoàn thành và bạn sẽ nhận được các gợi ý phù hợp với mục tiêu và trình độ hiện tại của mình.
          </p>
        </div>
      </div>

      {/* Nút điều hướng */}
      <div className="flex justify-between">
        {/* Nút "Trở lại" bị vô hiệu hóa ở bước đầu tiên */}
        <button
          disabled
          className="flex items-center px-6 py-3 rounded-lg font-medium transition-colors duration-200 text-gray-400 cursor-not-allowed"
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

        {/* Nút "Tiếp tục" */}
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
