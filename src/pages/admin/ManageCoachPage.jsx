import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import AddCoachModal from "../../components/admin/AddCoachModal";
import { toast } from "react-toastify";
import API from "../../api";

const ManageCoachPage = () => {
  const [userList, setUserList] = useState([]);
  const { get } = useFetch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCoach, setSelectedCoach] = useState(null); // 🟢 Coach được chọn
  const [showUserModal, setShowUserModal] = useState(false); // 🟢 Modal người đăng ký

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(`/users`);
        console.log(response);
        setUserList(response?.data?.data);
      } catch (error) {
        console.error("Fetch error in ManageCoachPage:", error);
      }
    };
    fetchData();
  }, [get]);

  const handleSuccess = async () => {
    setIsModalOpen(false);
    toast.success("Thêm huấn luyện viên thành công!");
    try {
      const response = await API.get(`/users`);
      setUserList(response?.data?.data);
    } catch (error) {
      console.error("Fetch error in ManageCoachPage:", error);
    }
  };

  // 🧩 Lọc coach & user premium
  const userCoach = userList.filter((user) => user.role === "COACH");
  const premiumUsers = userList.filter(
    (user) => user.role === "USER" && user.coach && user.coach.userID
  );

  // 🧩 Đếm số người đăng ký cho mỗi coach
  const coachUserCount = {};
  premiumUsers.forEach((user) => {
    const coachID = user.coach.userID;
    coachUserCount[coachID] = (coachUserCount[coachID] || 0) + 1;
  });

  // 🧩 Gắn số lượng user vào từng coach
  const coachesWithCounts = userCoach.map((coach) => ({
    ...coach,
    users: coachUserCount[coach.userID] || 0,
  }));

  // 🧩 Lọc theo từ khóa tìm kiếm
  const filteredCoaches = coachesWithCounts.filter((coach) => {
    const name =
      coach.fullName?.toLowerCase() || coach.username?.toLowerCase() || "";
    return name.includes(searchTerm.toLowerCase());
  });

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // 🧩 Hàm xem danh sách người đăng ký
  const handleViewUsers = (coach) => {
    setSelectedCoach(coach);
    setShowUserModal(true);
  };

  // 🧩 Lấy danh sách user đăng ký coach được chọn
  const registeredUsers =
    selectedCoach && premiumUsers.filter((u) => u.coach.userID === selectedCoach.userID);

  return (
    <div className="p-6 space-y-6">
      <AddCoachModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Huấn luyện viên</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <line x1="19" y1="8" x2="19" y2="14"></line>
            <line x1="22" y1="11" x2="16" y2="11"></line>
          </svg>
          <span>Thêm huấn luyện viên</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.34-4.34" />
          </svg>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên huấn luyện viên..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Coach Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCoaches.map((coach, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 relative"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {coach.img ? (
                  <img
                    src={coach.img}
                    alt={coach.fullName}
                    className="h-12 w-12 rounded-full"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-lg font-medium text-white">
                      {coach.fullName
                        ? coach.fullName.charAt(0)
                        : coach.username.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {coach.fullName || coach.username}
                  </h3>
                  <p className="text-sm text-gray-500">{coach.email || " "}</p>
                </div>
              </div>

              {/* Nút 3 chấm */}
              <div className="relative">
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => handleViewUsers(coach)}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="19" cy="12" r="1" />
                    <circle cx="5" cy="12" r="1" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Số người đăng kí</span>
                <div className="flex items-center space-x-1">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900">
                    {coach.users}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Trạng thái</span>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                  {coach.status}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Ngày tham gia</span>
                <span className="text-sm text-gray-900">
                  {formatDate(coach.createdAt)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-sm text-gray-500">
        Hiển thị {filteredCoaches.length} huấn luyện viên
      </div>

      {/* 🟢 Modal xem người đăng ký */}
      {showUserModal && selectedCoach && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Người đăng ký {selectedCoach.fullName || selectedCoach.username}
            </h2>

            {registeredUsers && registeredUsers.length > 0 ? (
              <ul className="divide-y divide-gray-200 max-h-80 overflow-y-auto">
                {registeredUsers.map((user, index) => (
                  <li key={index} className="py-2">
                    <p className="font-medium text-gray-900">
                      {user.fullName || user.username}
                    </p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Chưa có người đăng ký nào.</p>
            )}

            <div className="mt-6 flex justify-end">
              <button
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm"
                onClick={() => setShowUserModal(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCoachPage;
