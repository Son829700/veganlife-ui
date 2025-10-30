import { Link } from "react-router-dom";
import { Mail, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import { toast } from "react-toastify";
import { useState } from "react";
import API from "../../api";


export default function Footer() {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Vui lòng nhập email của bạn!");
      return;
    }

    setLoading(true);
    try {
      const subject = encodeURIComponent("Chào mừng bạn đến với Vegan Life!");


      const url = `/identity/email/sendToEmail/${email}/subject/${subject}`;

      await API.post(url);

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
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Logo + Mô tả */}
          <div>
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <img
                src="/veganlife-logo.png"
                alt="Vegan Life"
                className="h-12 w-auto transform group-hover:scale-110 transition-transform duration-500"
              />
            </Link>
            <p className="text-gray-300 text-lg leading-relaxed max-w-sm">
              Đồng hành cùng bạn trên hành trình sống xanh, ăn chay và lan tỏa tình yêu với thiên nhiên.
            </p>
          </div>

          {/* Liên kết nhanh */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Liên kết nhanh</h3>
            <nav className="space-y-4">
              <Link
                to="/"
                className="block text-gray-300 hover:text-emerald-400 transition-all duration-300 text-lg transform hover:translate-x-1"
              >
                Trang chủ
              </Link>
              <Link
                to="/coaching"
                className="block text-gray-300 hover:text-emerald-400 transition-all duration-300 text-lg transform hover:translate-x-1"
              >
                Giải pháp
              </Link>
              <Link
                to="/resources"
                className="block text-gray-300 hover:text-emerald-400 transition-all duration-300 text-lg transform hover:translate-x-1"
              >
                Thư viện
              </Link>
              <Link
                to="/about"
                className="block text-gray-300 hover:text-emerald-400 transition-all duration-300 text-lg transform hover:translate-x-1"
              >
                Giới thiệu
              </Link>
              <Link
                to="/community"
                className="block text-gray-300 hover:text-emerald-400 transition-all duration-300 text-lg transform hover:translate-x-1"
              >
                Cộng đồng
              </Link>
              {/* <Link
                to="/contact"
                className="block text-gray-300 hover:text-emerald-400 transition-all duration-300 text-lg transform hover:translate-x-1"
              >
                Liên hệ
              </Link> */}
            </nav>
          </div>

          {/* Đăng ký nhận tin */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Đăng ký nhận tin</h3>
            <p className="text-gray-300 mb-6 text-lg">
              Nhận cảm hứng, mẹo ăn chay và công thức mới mỗi tuần.
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-6 w-6 text-gray-400" />
                <input
                  type="email"
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {loading ? "Đang gửi..." : "Đăng ký"}
              </button>
            </form>

          </div>
        </div>
      </div>

      {/* Phần dưới cùng */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Icon mạng xã hội */}
            <div className="flex items-center gap-4">
              {[
                { Icon: Facebook, label: "Facebook", url: "https://www.facebook.com/profile.php?id=61581699869417" },
                { Icon: Instagram, label: "Instagram", url: "https://www.instagram.com/veganlife.project?igsh=anI3bHAxazUwbXRi" },
                { Icon: Youtube, label: "YouTube" },
                { Icon: Linkedin, label: "LinkedIn" },
              ].map(({ Icon, label, url }, idx) => (
                <a
                  key={idx}
                  href={url || "#"}
                  aria-label={label}
                  className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-emerald-500 transition-all duration-300 hover:scale-110"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            {/* Bản quyền + liên kết */}
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm mb-2">
                © 2025 Vegan Life. Mọi quyền được bảo lưu.
              </p>
              <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
                <Link
                  to="#"
                  className="text-gray-400 hover:text-emerald-400 transition-colors duration-200"
                >
                  Chính sách bảo mật
                </Link>
                <span className="text-gray-600">|</span>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-emerald-400 transition-colors duration-200"
                >
                  Điều khoản dịch vụ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
