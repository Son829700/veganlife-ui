import React from "react";

const CHALLENGE_OPTIONS = [
  "Đảm bảo đủ lượng protein",
  "Lập kế hoạch và chuẩn bị bữa ăn",
  "Kỹ năng nấu ăn",
  "Sự ủng hộ từ gia đình/xã hội",
  "Ăn ngoài và các sự kiện xã hội",
  "Kiến thức về dinh dưỡng",
  "Hạn chế về thời gian",
  "Quan ngại về chi phí",
];

export default function Step5({ data, onChange, onNext, onPrevious }) {
  const selectedChallenges = data.challenges || [];

  const handleToggle = (challenge) => {
    const updated = selectedChallenges.includes(challenge)
      ? selectedChallenges.filter((item) => item !== challenge)
      : [...selectedChallenges, challenge];

    onChange("challenges", updated);
  };

  const isSelected = (challenge) => selectedChallenges.includes(challenge);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Thanh tiến trình */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-500">Bước 5 trên 7</span>
          <span className="text-sm font-medium text-gray-500">Hoàn thành 71%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-emerald-500 to-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: "71.4286%" }}
          ></div>
        </div>
      </div>

      {/* Nội dung */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Thách thức</h1>
          <p className="text-gray-600">
            Những mối bận tâm của bạn khi chuyển sang lối sống thuần thực vật là gì?
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600 mb-6">Chọn tất cả những điều bạn lo ngại:</p>
          <div className="grid md:grid-cols-2 gap-4">
            {CHALLENGE_OPTIONS.map((challenge) => (
              <button
                key={challenge}
                type="button"
                onClick={() => handleToggle(challenge)}
                className={`p-4 rounded-lg border-2 text-left transition-colors duration-200 ${
                  isSelected(challenge)
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {challenge}
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
