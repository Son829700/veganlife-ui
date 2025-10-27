import axios from "axios";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginModal from "../../pages/login/LoginModal";
const CTASection = () => {
  const { user } = useAuthContext();
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Vui lòng nhập email của bạn!");
      return;
    }

    setLoading(true);
    try {
      const subject = encodeURIComponent("Chào mừng bạn đến với Vegan Life!");
     

      const url = `http://localhost:8080/identity/email/sendToEmail/${email}/subject/${subject}`;

      await axios.post(url);

      toast.success("Gửi email thành công! Vui lòng kiểm tra hộp thư của bạn.");
      setEmail("");
    } catch (error) {
      console.error("❌ Lỗi khi gửi email:", error);
      toast.error("Không thể gửi email. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {/* Phần testimonial */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Câu chuyện thật, kết quả thật</h2>
            <p className="text-xl text-gray-600">Những người đã thay đổi cuộc sống của họ với Vegan Life</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Trần Võ Minh Anh",
                role: "Quản lý Marketing",
                quote: "Vegan Life đã thay đổi cách tôi nhìn nhận về thực phẩm. Huấn luyện viên giúp tôi vượt qua lo lắng dinh dưỡng, và tôi thấy tràn đầy năng lượng!",
                result: "Giảm 11kg trong 4 tháng",
                img: "https://images.pexels.com/photos/3760809/pexels-photo-3760809.jpeg?auto=compress&cs=tinysrgb&w=400"
              },
              {
                name: "Nguyễn Đức Việt",
                role: "Kỹ sư Phần mềm",
                quote: "Ban đầu tôi nghi ngờ, nhưng cộng đồng và chuyên gia thực sự tạo nên sự khác biệt. Năng lượng của tôi chưa bao giờ tốt hơn.",
                result: "Cải thiện hiệu suất thể thao",
                img: "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=400"
              },
              {
                name: "Lê Thị Hồng Nhung",
                role: "Giáo viên & Mẹ",
                quote: "Thực đơn và công thức rất dễ áp dụng cho gia đình. Trẻ nhà tôi thậm chí còn thích ăn chay!",
                result: "Cả gia đình chuyển sang thuần chay",
                img: "https://images.pexels.com/photos/3760790/pexels-photo-3760790.jpeg?auto=compress&cs=tinysrgb&w=400"
              }
            ].map((user, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <img src={user.img} alt={user.name} className="w-16 h-16 rounded-full mr-4 object-cover" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
                    <p className="text-gray-600 text-sm">{user.role}</p>
                    <div className="flex items-center mt-1">
                      {Array(5).fill().map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="lucide lucide-star h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 italic leading-relaxed">"{user.quote}"</p>
                <div className="bg-emerald-50 px-4 py-2 rounded-lg">
                  <p className="text-emerald-700 font-semibold text-sm">{user.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form nhận starter kit */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-green-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="lucide lucide-download h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" x2="12" y1="15" y2="3"></line>
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Nhận Bộ Hướng Dẫn Ăn Chay Miễn Phí</h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Tham gia nhận bản tin và nhận ngay bộ hướng dẫn với thực đơn, danh sách mua sắm và công thức đơn giản cho người mới bắt đầu.
            </p>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="lucide lucide-mail absolute left-3 top-3 h-6 w-6 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  <input
                    type="email"
                    placeholder="Nhập email của bạn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-full border-0 focus:ring-4 focus:ring-white/20 text-gray-900 placeholder-gray-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`bg-white text-emerald-600 px-8 py-3 rounded-full font-semibold transition-all duration-200 whitespace-nowrap
            ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-gray-50 hover:scale-105"}
          `}
                >
                  {loading ? "Đang gửi..." : "Nhận miễn phí"}
                </button>
              </div>
            </form>
            <p className="text-emerald-100 text-sm mt-4">Chúng tôi không gửi spam. Bạn có thể huỷ đăng ký bất cứ lúc nào.</p>
          </div>
        </div>
      </section>

      {/* CTA cuối cùng */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Sẵn sàng thay đổi cuộc sống?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Hãy tham gia cộng đồng ăn chay với sự hướng dẫn từ chuyên gia và hỗ trợ từ cộng đồng.
          </p>
          <button
            className="bg-gradient-to-r from-emerald-600 to-green-700 text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center group"
            onClick={handleClick}
          >
            Bắt đầu hành trình
            <svg xmlns="http://www.w3.org/2000/svg" className="lucide lucide-arrow-right ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </button>
          <p className="text-gray-500 text-sm mt-4">Dùng thử miễn phí 7 ngày • Không cần thẻ tín dụng • Huỷ bất kỳ lúc nào</p>
        </div>
      </section>
    </>
  );
};

export default CTASection;
