import React, { useState } from "react";
import LoginModal from "../../pages/login/LoginModal";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import VideoModal from "../../components/others/VideoModal";


const HeroSection = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleClick = () => {
    if (user) {
      if (user.plan === "PREMIUM") {
        navigate("/coaching-dashboard");
      } else {
        navigate("/coaching");
      }
    } else {
      setShowLogin(true);
    }
  };

  return (
    <div>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showVideo && <VideoModal onClose={() => setShowVideo(false)} />}
      {/* Section 1: Hero */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-white/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Khởi đầu hành trình <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700">ăn thuần thực vật</span> một cách tự tin
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Cải thiện sức khỏe và lối sống của bạn với sự hướng dẫn từ chuyên gia, huấn luyện cá nhân hóa và cộng đồng hỗ trợ. Chuyển sang lối sống thuần chay một cách đơn giản, bền vững và thú vị.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  className="bg-gradient-to-r from-emerald-600 to-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center group"
                  onClick={handleClick}
                  data-discover="true"
                >
                  Bắt đầu ngay
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>

                <button
                  onClick={() => setShowVideo(true)}
                  className="border-2 border-emerald-600 text-emerald-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-50 transition-all duration-200 flex items-center justify-center group">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                  Xem video giới thiệu
                </button>
              </div>
              {/* <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <path d="m9 11 3 3L22 4" />
                  </svg>
                  <span>Dùng thử 7 ngày miễn phí</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <path d="m9 11 3 3L22 4" />
                  </svg>
                  <span>Không cần thẻ tín dụng</span>
                </div>
              </div> */}
            </div>
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Bữa ăn thuần thực vật"
                  className="rounded-3xl shadow-2xl w-full"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Stats */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-gray-600 font-medium">Được hơn 25.000 người tin tưởng trên toàn thế giới</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-1">25K+</div>
              <div className="text-gray-600 text-sm">Thành viên đang hoạt động</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-1">98%</div>
              <div className="text-gray-600 text-sm">Tỷ lệ thành công</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-1">500+</div>
              <div className="text-gray-600 text-sm">Tài nguyên chuyên gia</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-1">4.9★</div>
              <div className="text-gray-600 text-sm">Đánh giá trung bình</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
