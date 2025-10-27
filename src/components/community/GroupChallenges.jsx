import React from "react";

const GroupChallenges = ({ onJoinChallenge }) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tiêu đề */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Thử thách nhóm
          </h2>
          <p className="text-xl text-gray-600">
            Giữ động lực và trách nhiệm cùng các thử thách cộng đồng hấp dẫn
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Thử thách 1 */}
          <div className="bg-gray-50 p-8 rounded-2xl group hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                Sắp bắt đầu
              </span>
              <span className="text-sm text-gray-500">Người mới</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors duration-200">
              Thử thách thuần chay 21 ngày
            </h3>
            <p className="text-gray-600 mb-6">
              Hoàn hảo cho người mới bắt đầu tìm hiểu chế độ ăn thuần chay với
              hỗ trợ và hướng dẫn hằng ngày.
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-1">
                {/* Icon người */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span>2.847 người tham gia</span>
              </div>
              <div className="flex items-center gap-1">
                {/* Icon lịch */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 2v4"></path>
                  <path d="M16 2v4"></path>
                  <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                  <path d="M3 10h18"></path>
                </svg>
                <span>21 ngày</span>
              </div>
            </div>
            <button
              onClick={() => onJoinChallenge?.("vegan-21")}
              className="w-full bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors duration-200"
            >
              Tham gia thử thách
            </button>
          </div>

          {/* Thử thách 2 */}
          <div className="bg-gray-50 p-8 rounded-2xl group hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Đang mở
              </span>
              <span className="text-sm text-gray-500">Nâng cao</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors duration-200">
              Thử thách vận động viên thuần chay
            </h3>
            <p className="text-gray-600 mb-6">
              Tối ưu hiệu suất thể thao của bạn với dinh dưỡng và chiến lược tập
              luyện thuần chay.
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span>1.234 người tham gia</span>
              </div>
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 2v4"></path>
                  <path d="M16 2v4"></path>
                  <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                  <path d="M3 10h18"></path>
                </svg>
                <span>30 ngày</span>
              </div>
            </div>
            <button
              onClick={() => onJoinChallenge?.("athlete")}
              className="w-full bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors duration-200"
            >
              Tham gia thử thách
            </button>
          </div>

          {/* Thử thách 3 */}
          <div className="bg-gray-50 p-8 rounded-2xl group hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Đang mở
              </span>
              <span className="text-sm text-gray-500">Trung cấp</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors duration-200">
              Bậc thầy chuẩn bị bữa ăn
            </h3>
            <p className="text-gray-600 mb-6">
              Làm chủ nghệ thuật chuẩn bị bữa ăn thuần chay với các thử thách
              hàng tuần và chia sẻ công thức.
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span>3.456 người tham gia</span>
              </div>
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 2v4"></path>
                  <path d="M16 2v4"></path>
                  <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                  <path d="M3 10h18"></path>
                </svg>
                <span>28 ngày</span>
              </div>
            </div>
            <button
              onClick={() => onJoinChallenge?.("meal-prep")}
              className="w-full bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors duration-200"
            >
              Tham gia thử thách
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupChallenges;
