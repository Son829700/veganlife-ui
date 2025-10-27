import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";
import dayjs from "dayjs";

const DashBoardCoach = () => {
  const { user } = useAuthContext();
  const [userManaged, setUserManaged] = useState(0);


  useEffect(() => {
    const fetchUserManaged = async () => {
      if (!user?.userID) return;
      try {
        const res = await axios.get(`http://localhost:8080/identity/users/coach_user/${user.userID}`);

        const count = res?.data?.data.length || 0;
        setUserManaged(count);
      }
      catch (error) {
        console.error("Lỗi khi lấy số lượng học viên:", error);
      }
    };
    fetchUserManaged();
  }, [user]);

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const lastUpdated = new Date().toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const startOfWeek = dayjs().startOf("week").add(1, "day"); // Thứ 2
  const endOfWeek = startOfWeek.add(6, "day").endOf("day");

  // 🟢 Hàm fetch danh sách buổi hẹn của HLV
  const fetchAppointments = async () => {
    if (!user?.userID) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8080/identity/appointment/coach-appointments/${user.userID}`
      );

      const data = res?.data?.data || res?.data || [];

      const now = dayjs();

      // 🧩 Chỉ lấy buổi hẹn còn hạn hoặc tương lai
      const validAppointments = data.filter(
        (a) => dayjs(a.appointmentDateTime).isAfter(now)
      );
      // Sắp xếp theo thời gian gần nhất
      validAppointments.sort((a, b) =>
        dayjs(a.appointmentDateTime).isAfter(dayjs(b.appointmentDateTime)) ? 1 : -1
      );

      setAppointments(validAppointments);
    } catch (error) {
      console.error("❌ Lỗi khi lấy danh sách buổi hẹn:", error);
      toast.error("Không thể tải danh sách buổi hẹn.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [user]);

  // 🧮 Tính toán số liệu
  const totalBooked = appointments.length;
  const upcomingCount = appointments.filter((a) => {
    const date = dayjs(a.appointmentDateTime);
    return date.isAfter(startOfWeek) && date.isBefore(endOfWeek);
  }).length;

  return (
    <div className="space-y-6">
      {/* Tiêu đề */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard HLV</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M12 6v6l4 2" />
            <circle cx="12" cy="12" r="10" />
          </svg>
          <span>Cập nhật lần cuối: {lastUpdated}</span>
        </div>
      </div>

      {/* Các thẻ tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Học viên quản lý */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Học viên quản lý
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{userManaged}</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <circle cx="9" cy="7" r="4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Buổi học đã book */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Buổi học đã book
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {totalBooked}
              </p>
            </div>
            <div className="bg-green-500 p-3 rounded-lg">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="m16 11 2 2 4-4" />
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Buổi học sắp tới */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Buổi học trong tuần này
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {upcomingCount}
              </p>
            </div>
            <div className="bg-purple-500 p-3 rounded-lg">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M3 10h18" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Bảng lịch trong tháng */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Lịch buổi học trong tháng
        </h2>

        {loading ? (
          <div className="text-center text-gray-500 py-6 animate-pulse">
            Đang tải dữ liệu...
          </div>
        ) : appointments.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="border p-2 text-left">Ngày</th>
                <th className="border p-2 text-left">Giờ</th>
                <th className="border p-2 text-left">Học viên</th>
                <th className="border p-2 text-left">Link họp</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a, idx) => {
                const date = new Date(a.appointmentDateTime);
                const dateStr = date.toLocaleDateString("vi-VN");

                const startHour = date.getHours();
                const startMinute = date.getMinutes();
                const endHour = (startHour + 1) % 24;
                const formatTime = (h, m) =>
                  `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
                const timeStr = `${formatTime(startHour, startMinute)} - ${formatTime(endHour, startMinute)}`;
                return (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="border p-2">{dateStr}</td>
                    <td className="border p-2">{timeStr}</td>
                    <td className="border p-2">
                      {a?.user?.fullName || a?.user?.username}
                    </td>
                    <td className="border p-2">
                      {a?.link ? (
                        <a
                          href={a.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Tham gia
                        </a>
                      ) : (
                        <span className="text-gray-400 italic">
                          Chưa có link
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-6 text-gray-500 italic">
            Chưa có buổi học nào trong tháng này
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoardCoach;
