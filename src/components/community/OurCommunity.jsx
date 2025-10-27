import React from "react";

const OurCommunity = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tiêu đề + mô tả */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Vì sao nên tham gia cộng đồng?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trải nghiệm sức mạnh của sự kết nối và hỗ trợ trên hành trình thuần chay của bạn
          </p>
        </div>

        {/* Các lợi ích */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Hỗ trợ đồng hành */}
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="lucide lucide-users h-8 w-8 text-white"
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
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Hỗ trợ đồng hành</h3>
            <p className="text-gray-600">
              Kết nối với hàng ngàn người cùng chí hướng, những người thấu hiểu và sẵn sàng chia sẻ niềm vui với bạn.
            </p>
          </div>

          {/* Khích lệ tinh thần */}
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="lucide lucide-heart h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Khích lệ tinh thần</h3>
            <p className="text-gray-600">
              Nhận sự động viên và hỗ trợ đúng lúc từ những người đã từng trải qua hành trình giống bạn.
            </p>
          </div>

          {/* Thử thách nhóm */}
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="lucide lucide-trophy h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                <path d="M4 22h16"></path>
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Thử thách nhóm</h3>
            <p className="text-gray-600">
              Tham gia các thử thách thú vị, truyền cảm hứng và giúp bạn duy trì động lực bền vững.
            </p>
          </div>

          {/* Hỏi đáp chuyên gia */}
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="lucide lucide-message-circle h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Hỏi đáp chuyên gia</h3>
            <p className="text-gray-600">
              Nhận câu trả lời từ các huấn luyện viên và chuyên gia dinh dưỡng được chứng nhận.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurCommunity;
