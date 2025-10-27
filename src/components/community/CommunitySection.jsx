import React from "react";

const CommunitySection = () => {
  return (
    <section>
      {/* Phần 1 - Hero giới thiệu */}
      <div className="bg-gradient-to-br from-emerald-50 to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Tham gia{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-600">
                Cộng đồng
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Kết nối với hàng ngàn người cùng chí hướng. Chia sẻ trải nghiệm, ăn
              mừng thành công và cùng nhau phát triển trong cộng đồng thuần chay
              thân thiện.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.facebook.com/share/g/1GExtoYVFG/"
                className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center group"
              >
                Tham gia ngay
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
              
            </div>
          </div>
        </div>
      </div>

      {/* Phần 2 - Thống kê */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">
                25K+
              </div>
              <div className="text-gray-600 text-lg">Thành viên hoạt động</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">
                50+
              </div>
              <div className="text-gray-600 text-lg">Thảo luận mỗi ngày</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">
                200+
              </div>
              <div className="text-gray-600 text-lg">Câu chuyện thành công</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">
                98%
              </div>
              <div className="text-gray-600 text-lg">Phản hồi tích cực</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
