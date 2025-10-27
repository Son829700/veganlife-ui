import React from "react";

const EXPERIENCE_OPTIONS = [
  {
    title: "Người mới hoàn toàn",
    description: "Chưa từng thử ăn chay hoặc thuần thực vật",
  },
  {
    title: "Đã có chút kinh nghiệm",
    description: "Đã từng thử vài bữa ăn thuần thực vật",
  },
  {
    title: "Ăn thuần thực vật bán thời gian",
    description: "Đôi khi đã ăn theo chế độ thực vật",
  },
  {
    title: "Có kinh nghiệm",
    description: "Gần như ăn thực vật hoàn toàn, cần tinh chỉnh thêm",
  },
];

export default function Step4({ data, onChange, onNext, onPrevious }) {
  const selected = data.experienceLevel || "";

  const handleSelect = (value) => {
    onChange("experienceLevel", value);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Tiến trình */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-500">Bước 4 trên 7</span>
          <span className="text-sm font-medium text-gray-500">Hoàn thành 57%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-emerald-500 to-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: "57.1429%" }}
          ></div>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Trình độ hiện tại</h1>
          <p className="text-gray-600">
            Bạn đã quen thuộc với chế độ ăn thuần thực vật đến mức nào?
          </p>
        </div>

        <div className="space-y-4">
          {EXPERIENCE_OPTIONS.map((option) => {
            const isActive = selected === option.title;

            return (
              <button
                key={option.title}
                type="button"
                onClick={() => handleSelect(option.title)}
                className={`w-full p-6 rounded-lg border-2 text-left transition-colors duration-200 ${
                  isActive
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <h3 className="font-semibold text-lg mb-2">{option.title}</h3>
                <p className="text-gray-600">{option.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Nút điều hướng */}
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
          Trở lại
        </button>

        <button
          onClick={onNext}
          className="flex items-center px-6 py-3 rounded-lg font-medium transition-colors duration-200 bg-emerald-500 text-white hover:bg-emerald-600"
        >
          Tiếp tục
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
