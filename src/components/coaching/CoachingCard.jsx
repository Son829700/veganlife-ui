import React from "react";

const CoachCard = ({ coach, isSelected, onSelect }) => {
  return (
    <div
      className={`relative bg-white rounded-3xl shadow-lg p-6 text-center transition-all duration-300 cursor-pointer group ${
        isSelected
          ? "ring-2 ring-emerald-500 shadow-2xl scale-105 bg-gradient-to-br from-emerald-50 to-green-50"
          : "hover:shadow-2xl hover:scale-105 hover:-translate-y-2"
      } h-full flex flex-col justify-between`}
      onClick={onSelect}
    >
      {isSelected && (
        <div className="absolute -top-3 -right-3 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="lucide lucide-check-circle h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <path d="m9 11 3 3L22 4" />
          </svg>
        </div>
      )}

      <div className="flex-1">
        {/* Ảnh đại diện */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300">
            <img
              src={coach.image}
              alt={coach.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>

          {/* Icon nghề nghiệp */}
          <div
            className={`absolute -bottom-2 -right-2 w-10 h-10 ${coach.badgeColor} rounded-full flex items-center justify-center shadow-lg`}
          >
            {coach.badgeIcon}
          </div>
        </div>

        {/* Tên & mô tả */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">{coach.name}</h3>
        <p className="text-emerald-600 font-semibold mb-3">{coach.title}</p>

        <div className="flex flex-wrap gap-1 justify-center mb-4">
          {coach.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{coach.description}</p>

        {/* Info */}
        <div className="flex items-center justify-center gap-4 text-xs text-gray-500 mb-6">
          <div className="flex items-center gap-1">
            <svg className="h-3 w-3 text-yellow-400 fill-current" viewBox="0 0 24 24">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span>{coach.rating}</span>
          </div>
          <div>{coach.experience}</div>
          <div>{coach.clients} khách hàng</div>
        </div>
      </div>

      {/* Nút chọn */}
      <button
        className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
          isSelected
            ? "bg-emerald-500 text-white shadow-lg"
            : "bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 group-hover:shadow-md"
        }`}
      >
        {isSelected ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="lucide lucide-user-check h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <polyline points="16 11 18 13 22 9" />
            </svg>
            Đã chọn
          </span>
        ) : (
          "Chọn huấn luyện viên"
        )}
      </button>
    </div>
  );
};

export default CoachCard;
