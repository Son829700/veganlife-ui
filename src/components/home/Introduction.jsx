import React from 'react';

const Introduction = () => {
  return (
    <div>
      {/* Section: Tất cả những gì bạn cần */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mọi Thứ Bạn Cần Để Thành Công
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nền tảng toàn diện của chúng tôi kết hợp kiến thức chuyên môn, hướng dẫn cá nhân hóa và cộng đồng hỗ trợ để giúp bạn chuyển đổi sang chế độ ăn thuần chay một cách dễ dàng.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Nội Dung Từ Chuyên Gia</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Truy cập hướng dẫn đầy đủ, công thức nấu ăn ngon và video giáo dục từ các chuyên gia dinh dưỡng được chứng nhận.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700">✔️ Hơn 500 công thức</li>
                <li className="flex items-center text-gray-700">✔️ Hướng dẫn dinh dưỡng</li>
                <li className="flex items-center text-gray-700">✔️ Video hướng dẫn</li>
                <li className="flex items-center text-gray-700">✔️ Thực đơn ăn uống</li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Huấn Luyện Riêng 1-1</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Nhận được sự hướng dẫn cá nhân từ các huấn luyện viên được chứng nhận, hiểu rõ hành trình và mục tiêu của bạn.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700">✔️ Huấn luyện viên cá nhân</li>
                <li className="flex items-center text-gray-700">✔️ Gặp mặt định kỳ</li>
                <li className="flex items-center text-gray-700">✔️ Kế hoạch riêng biệt</li>
                <li className="flex items-center text-gray-700">✔️ Theo dõi tiến trình</li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Cộng Đồng Hỗ Trợ</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Tham gia hàng ngàn người cùng chí hướng, chia sẻ kinh nghiệm và hỗ trợ nhau trên từng bước đi.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700">✔️ Hỗ trợ 24/7</li>
                <li className="flex items-center text-gray-700">✔️ Thử thách nhóm</li>
                <li className="flex items-center text-gray-700">✔️ Câu chuyện thành công</li>
                <li className="flex items-center text-gray-700">✔️ Hỏi đáp chuyên gia</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Tại sao chọn Vegan Life */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Vì Sao Chọn Vegan Life?
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Chúng tôi hiểu rằng chuyển sang chế độ ăn thuần chay có thể khiến bạn bối rối. Vì vậy, chúng tôi đã tạo ra nền tảng đơn giản, cá nhân hóa và truyền cảm hứng cho bạn.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <svg className="h-6 w-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <path d="m9 11 3 3L22 4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Phù Hợp Với Mọi Người</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Dù bạn không giỏi nấu ăn hay chưa có kinh nghiệm, chúng tôi hướng dẫn từng bước để giúp bạn sống thuần chay dễ dàng.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <svg className="h-6 w-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Cá Nhân Hóa Cho Bạn</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Hành trình của bạn là độc nhất. Chúng tôi điều chỉnh nội dung và kế hoạch huấn luyện theo mục tiêu và lối sống của riêng bạn.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <svg className="h-6 w-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Động Lực Bền Vững</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Cộng đồng và đội ngũ huấn luyện của chúng tôi giúp bạn giữ vững động lực và cam kết với mục tiêu lâu dài.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="./Food.png"
                alt="Lối sống thuần chay lành mạnh"
                className="rounded-3xl shadow-2xl w-full"
              />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full opacity-20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Introduction;
