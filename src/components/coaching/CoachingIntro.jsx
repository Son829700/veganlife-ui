import React from "react";

export default function CoachingIntro() {
  return (
    <section className="relative bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 py-20 overflow-hidden">
      <div className="absolute inset-0 bg-white/20"></div>
      <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-20 blur-3xl"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 text-center border border-white/50">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="lucide lucide-check-circle h-10 w-10 text-white">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <path d="m9 11 3 3L22 4" />
            </svg>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Chương trình Tối ưu hóa
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Thiết kế dành riêng để giúp bạn phát triển mạnh mẽ hơn trong hành trình ăn chay.
          </p>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="lucide lucide-trophy h-6 w-6 text-emerald-500">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
              </svg>
              Những gì bạn nhận được
            </h3>

            <div className="grid md:grid-cols-2 gap-4 text-left">
              {[
                "Chiến lược dinh dưỡng nâng cao",
                "Buổi huấn luyện 1-kèm-1 hàng tuần",
                "Công thức và hướng dẫn bữa ăn cá nhân hoá",
                "Hỗ trợ xây dựng lối sống và thói quen lành mạnh",
                "Theo dõi tiến độ và quyền truy cập cộng đồng",
              ].map((text, idx) => (
                <div key={idx} className="flex items-center group">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mr-3 group-hover:bg-emerald-200 transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      className="lucide lucide-check-circle h-4 w-4 text-emerald-600">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <path d="m9 11 3 3L22 4" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
