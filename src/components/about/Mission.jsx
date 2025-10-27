import React from "react";
import { Globe, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useState } from "react";
import LoginModal from "../../pages/login/LoginModal";

export default function Mission() {
  const [showLogin, setShowLogin] = useState(false);
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
    <>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {/* Tầm nhìn tương lai */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-green-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Globe className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Tầm nhìn của chúng tôi cho tương lai
            </h2>
            <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
              Chúng tôi hình dung một thế giới nơi lối sống xanh là điều bình thường chứ không phải ngoại lệ. Nơi việc chọn lòng từ bi trở nên dễ dàng, dễ tiếp cận và được hỗ trợ bởi một cộng đồng toàn cầu cùng chí hướng cùng nhau tạo ra sự thay đổi tích cực.
            </p>
            <p className="text-lg text-emerald-100">
              Cùng nhau, chúng ta không chỉ thay đổi chế độ ăn – mà còn đang chuyển hóa cuộc sống, cộng đồng và tương lai của hành tinh, từng người một.
            </p>
          </div>
        </div>
      </section>

      {/* CTA bắt đầu hành trình */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Sẵn sàng bắt đầu chưa?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Hãy làm một bài trắc nghiệm ngắn để khám phá lộ trình phù hợp nhất với bạn. Hành trình ăn chay của bạn sẽ bắt đầu từ việc hiểu chính mình.
          </p>
          <button
            onClick={handleClick}
            className="bg-gradient-to-r from-emerald-600 to-green-700 text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center group"
          >
            Khám phá kế hoạch cá nhân của bạn
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
          <p className="text-gray-500 text-sm mt-4">
            Miễn phí • Không cam kết • Gợi ý cá nhân hóa
          </p>
        </div>
      </section>
    </>
  );
}
