import React from "react";

const GOAL_OPTIONS = [
  "Cải thiện sức khỏe và năng lượng",
  "Giảm cân bền vững",
  "Giảm tác động đến môi trường",
  "Lý do đạo đức (bảo vệ động vật)",
  "Thử món ăn và công thức mới",
  "Giảm cholesterol / huyết áp",
  "Tăng hiệu suất thể thao",
  "Hỗ trợ người thân trong hành trình",
];

export default function Step3({ data, onChange, onNext, onPrevious }) {
  const selectedGoals = data.goals || [];

  // Toggle mục tiêu khi click
  const handleToggleGoal = (goal) => {
    const updatedGoals = selectedGoals.includes(goal)
      ? selectedGoals.filter((g) => g !== goal)
      : [...selectedGoals, goal];

    onChange("goals", updatedGoals);
  };

  // Check nếu đã chọn để tô màu border
  const isSelected = (goal) => selectedGoals.includes(goal);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Thanh tiến trình */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-500">Bước 3 trên 7</span>
          <span className="text-sm font-medium text-gray-500">Hoàn thành 43%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-emerald-500 to-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: "42.8571%" }}
          ></div>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        {/* Tiêu đề */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Mục tiêu của bạn</h1>
          <p className="text-gray-600">Bạn muốn đạt được điều gì với lối sống thuần thực vật?</p>
        </div>

        {/* Danh sách mục tiêu */}
        <div className="space-y-4">
          <p className="text-gray-600 mb-6">Chọn tất cả những gì phù hợp:</p>
          <div className="grid md:grid-cols-2 gap-4">
            {GOAL_OPTIONS.map((goal) => (
              <button
                key={goal}
                type="button"
                onClick={() => handleToggleGoal(goal)}
                className={`p-4 rounded-lg border-2 text-left transition-colors duration-200 ${
                  isSelected(goal)
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {goal}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Nút điều hướng */}
      <div className="flex justify-between">
        <button
          onClick={onPrevious}
          className="flex items-center px-6 py-3 rounded-lg font-medium transition-colors duration-200 text-gray-700 hover:bg-gray-100"
        >
          {/* Icon trái */}
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
          {/* Icon phải */}
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
