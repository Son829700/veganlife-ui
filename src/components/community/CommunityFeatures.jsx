import React from "react";

const CommunityFeatures = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tiêu đề */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tính năng cộng đồng
          </h2>
          <p className="text-xl text-gray-600">
            Mọi thứ bạn cần để kết nối, học hỏi và phát triển cùng nhau
          </p>
        </div>

        {/* Nội dung */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Danh sách tính năng */}
          <div>
            <div className="space-y-8">
              {/* Forum */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-500 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-white"
                  >
                    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Diễn đàn thảo luận
                  </h3>
                  <p className="text-gray-600">
                    Tham gia những cuộc trò chuyện ý nghĩa về dinh dưỡng, công
                    thức, mẹo sống và nhiều hơn nữa.
                  </p>
                </div>
              </div>

              {/* Virtual events */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-500 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-white"
                  >
                    <path d="M8 2v4"></path>
                    <path d="M16 2v4"></path>
                    <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                    <path d="M3 10h18"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Sự kiện trực tuyến
                  </h3>
                  <p className="text-gray-600">
                    Tham gia lớp nấu ăn trực tiếp, hội thảo dinh dưỡng và các
                    buổi hỏi đáp cùng chuyên gia.
                  </p>
                </div>
              </div>

              {/* Achievement */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-500 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-white"
                  >
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                    <path d="M4 22h16"></path>
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Hệ thống thành tích
                  </h3>
                  <p className="text-gray-600">
                    Nhận huy hiệu và phần thưởng khi bạn tiến bộ trên hành trình
                    ăn chay.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Hình ảnh minh họa */}
          <div className="lg:pl-12">
            <img
              src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Buổi gặp gỡ cộng đồng"
              className="rounded-2xl shadow-xl w-full hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityFeatures;
