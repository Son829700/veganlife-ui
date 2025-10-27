import React from 'react';

const Banner = () => {
  return (
    <>
      {/* Section chính với biểu tượng và mô tả */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-white/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <img
              src="./veganlife-logo.png"
              alt="Vegan Life Logo"
              className="h-100 w-80 mx-auto mb-6"
            />
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-20 blur-2xl">
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Trao Quyền Cho <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700">Hành Trình Ăn Chay</span> Của Bạn
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed max-w-4xl mx-auto">
              Vegan Life là người bạn đồng hành đáng tin cậy cho cuộc sống bền vững và nhân ái —
              được hướng dẫn bởi khoa học, hỗ trợ bởi cộng đồng, và thiết kế để giúp bạn chuyển đổi một cách đơn giản, dễ tiếp cận và truyền cảm hứng.
            </p>
          </div>
        </div>

        {/* Hiệu ứng mờ nền */}
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-20 blur-3xl"></div>
      </section>

      {/* Section thống kê */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">25K+</div>
              <div className="text-gray-600 text-lg">Cuộc sống được thay đổi</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">98%</div>
              <div className="text-gray-600 text-lg">Tỉ lệ thành công</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">50+</div>
              <div className="text-gray-600 text-lg">Quốc gia tiếp cận</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">4.9★</div>
              <div className="text-gray-600 text-lg">Đánh giá trung bình</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
