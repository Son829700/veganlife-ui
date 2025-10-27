import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import LoginModal from "../../pages/login/LoginModal";
import { toast } from "react-toastify";


export default function PlanSection({ selectedCoachId }) {
  const [selectedPlan, setSelectedPlan] = useState("quarterly");
  const [showLogin, setShowLogin] = useState(false);
  const { user } = useAuthContext();

  const navigate = useNavigate();
  const handleContinue = () => {
    if (!selectedCoachId) {
      toast.info("Vui lòng chọn huấn luyện viên trước khi tiếp tục!");
      return;
    }
    if (!user) {
      toast.info("Vui lòng đăng nhập để tiếp tục!");
      setShowLogin(true);
      return;
    }

    const price = selectedPlan === "monthly" ? 499000 : 1290000;

    navigate("/payment", {
      state: {
        coachId: selectedCoachId,
        plan: selectedPlan,
        amount: price,
      },
    });
  };




  const plans = [
    {
      key: "monthly",
      title: "Theo tháng",
      desc: "Hủy bất cứ lúc nào",
      price: "499 000 ₫",
      label: "/tháng",
    },
    {
      key: "quarterly",
      title: "Theo quý",
      desc: "Tiết kiệm nhất",
      price: "1 290 000 ₫",
      label: "/3 tháng",
      highlight: true,
      savings: "Tiết kiệm 20%",
    },
  ];

  return (

    <section className="py-5 bg-gradient-to-br from-gray-50 to-gray-100">
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-12 border border-white/50">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Bên trái - mô tả */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center lg:text-left">
                Chương trình huấn luyện bao gồm
              </h3>
              <div className="space-y-6">
                {[
                  {
                    title: "Cuộc gọi video 1-1 hàng tuần",
                    desc: "Gặp gỡ trực tuyến với huấn luyện viên cá nhân",
                    icon: (
                      <svg
                        className="lucide lucide-video h-6 w-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="m22 8-6 4 6 4V8Z"></path>
                        <rect width="14" height="12" x="2" y="6" rx="2" ry="2"></rect>
                      </svg>
                    ),
                  },
                  {
                    title: "Kế hoạch ăn uống & lối sống cá nhân",
                    desc: "Thiết kế riêng phù hợp mục tiêu và sở thích của bạn",
                    icon: (
                      <svg
                        className="lucide lucide-bar-chart3 h-6 w-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M3 3v18h18"></path>
                        <path d="M18 17V9"></path>
                        <path d="M13 17V5"></path>
                        <path d="M8 17v-3"></path>
                      </svg>
                    ),
                  },
                  {
                    title: "Trò chuyện trực tiếp với huấn luyện viên",
                    desc: "Hỗ trợ 24/7 khi bạn cần",
                    icon: (
                      <svg
                        className="lucide lucide-message-circle h-6 w-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                      </svg>
                    ),
                  },
                  {
                    title: "Truy cập cộng đồng riêng tư",
                    desc: "Kết nối với những người cùng chí hướng",
                    icon: (
                      <svg
                        className="lucide lucide-users h-6 w-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    ),
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bên phải - chọn gói */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Chọn gói huấn luyện
              </h3>
              <div className="space-y-4">
                {plans.map((plan) => (
                  <div
                    key={plan.key}
                    onClick={() => setSelectedPlan(plan.key)}
                    className={`relative bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-300 border-2 ${selectedPlan === plan.key
                      ? "border-emerald-500 shadow-xl scale-105"
                      : "border-gray-200 hover:border-emerald-300 hover:shadow-xl"
                      }`}
                  >
                    {plan.highlight && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                          {plan.desc}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedPlan === plan.key
                            ? "border-emerald-500 bg-emerald-500"
                            : "border-gray-300"
                            }`}
                        >
                          {selectedPlan === plan.key && (
                            <svg
                              className="lucide lucide-check-circle h-4 w-4 text-white"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              viewBox="0 0 24 24"
                            >
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                              <path d="m9 11 3 3L22 4"></path>
                            </svg>
                          )}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900">{plan.title}</h4>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          {plan.price}
                          <span className="text-base text-gray-600">{plan.label}</span>
                        </div>
                        {plan.savings && (
                          <div className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium mt-1">
                            {plan.savings}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Nút hành động */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <button
              onClick={handleContinue}
              // disabled={!selectedCoachId}
              className={`px-8 py-4 rounded-full text-lg font-semibold flex items-center justify-center group transition-all duration-300 ${selectedCoachId
                ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:scale-105 shadow-lg hover:shadow-2xl"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              Tiếp tục
              <svg
                className="lucide lucide-arrow-right ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>


          </div>
        </div>
      </div>
    </section>
  );
}
