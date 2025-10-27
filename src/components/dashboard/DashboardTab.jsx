import {
  CheckCircle,
  MessageSquare,
  User,
  Award,
  Clock,
  TrendingUp,
  Video,
  Calendar,
  ExternalLink,
  Lightbulb,
  Play,
  FileText,
} from "lucide-react";
import { useAuthContext } from "../../context/AuthContext";

export default function DashboardTab({ setActiveTab }) {

  const { user } = useAuthContext();

  return (
    <div className="p-6">
      <div className="space-y-8">
        {/* Lời chào */}
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Chào mừng trở lại, {user?.fullName || user?.username || "bạn"}! 👋
          </h2>
          <p className="text-gray-600">
            Bạn đang tiến bộ rất tốt trong hành trình ăn uống dựa trên thực vật.
            Đây là cập nhật mới nhất của bạn.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cột trái */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chương trình huấn luyện */}


            {/* Huấn luyện viên */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">👩‍⚕️ Huấn luyện viên</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img
                    src="/user.png"
                    alt="Dr. Maya Chen"
                    className="w-16 h-16 rounded-full object-cover shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900">{user.coach.fullName}</h4>
                  <p className="text-emerald-600 font-medium text-sm">
                    Huấn luyện viên lối sống thuần chay
                  </p>
                  <p className="text-gray-500 text-sm">Hơn 8 năm kinh nghiệm</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setActiveTab("messages")}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2">
                  <MessageSquare className="h-4 w-4" /> Nhắn tin cho huấn luyện viên
                </button>

              </div>
            </div>

            {/* Tiến độ mục tiêu tuần */}

          </div>

          {/* Cột phải */}
          <div className="space-y-6">
            {/* Buổi huấn luyện sắp tới */}
            {/* <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                📅 Buổi huấn luyện sắp tới
              </h3>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                    <Video className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Phiên tiếp theo</h4>
                    <p className="text-sm text-gray-600">Gọi video</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">Thứ 5, 16/01</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span>10:00 AM (45 phút)</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2">
                  <ExternalLink className="h-4 w-4" /> Tham gia Zoom Call
                </button>
              
              </div>
            </div> */}



            {/* Hành động nhanh */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">⚡ Hành động nhanh</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setActiveTab("messages")}
                  className="w-full bg-emerald-100 text-emerald-700 py-3 px-4 rounded-xl font-semibold hover:bg-emerald-200 transition-all duration-200 flex items-center justify-center gap-2">
                  <MessageSquare className="h-4 w-4" /> Gửi tin nhắn
                </button>
                <button
                  onClick={() => setActiveTab("schedule")}
                  className="w-full bg-blue-100 text-blue-700 py-3 px-4 rounded-xl font-semibold hover:bg-blue-200 transition-all duration-200 flex items-center justify-center gap-2">
                  <Calendar className="h-4 w-4" /> Đặt thêm buổi học
                </button>
                <a
                  href="/resources"
                  className="w-full bg-purple-100 text-purple-700 py-3 px-4 rounded-xl font-semibold hover:bg-purple-200 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <FileText className="h-4 w-4" /> Khám phá thư viên
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


