import React from "react";
import { useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import API from "../../../api";

const Overview = () => {
  const lastUpdated = new Date().toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const [userList, setUserList] = React.useState([]);
  const { get } = useFetch();
  const userRoleCount = userList.filter(user => user.role === 'USER').length;
  const userCoachCount = userList.filter(user => user.role === 'COACH').length;
  const [resources, setResources] = React.useState([]);
  const numberBlog = resources.length;
  const userFreeCount = userList.filter(user => user.role === 'USER' && user.plan === 'FREE').length;
  const userPremiumCount = userList.filter(user => user.role === 'USER' && user.plan === 'PREMIUM').length;
  const revenue = userPremiumCount * 499000;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(`/users`);
        setUserList(response.data?.data || []);
        console.log("Fetched users:", response);
      } catch (error) {
        console.error("Fetch error in ResourcePage:", error);
      }
    };

    fetchData();
  }, [get]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(`/resources`);
        console.log("API Response:", response); // sẽ ra mảng 9 item
        setResources(response.data?.data || []);
      } catch (error) {
        console.error("Fetch error in ResourcePage:", error);
      }
    };

    fetchData();
  }, []);

  const formatRevenue = (value) => {
    if (value >= 1_000_000_000) return (value / 1_000_000_000).toFixed(1) + "B";
    if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + "M";
    if (value >= 1_000) return (value / 1_000).toFixed(1) + "K";
    return value.toString();
  };


  return (
    <div className="space-y-6">
      {/* Tiêu đề + thời gian cập nhật */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Tổng quan Dashboard</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 6v6l4 2" />
            <circle cx="12" cy="12" r="10" />
          </svg>
          <span>Cập nhật lần cuối: {lastUpdated}</span>
        </div>
      </div>

      {/* Các thẻ tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Tổng số người dùng */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tổng số người dùng</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{userRoleCount}</p>
              <div className="flex items-center mt-2">
                <svg className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M16 7h6v6" />
                  <path d="m22 7-8.5 8.5-5-5L2 17" />
                </svg>
                <span className="text-sm ml-1 text-green-600">+12% so với tháng trước</span>
              </div>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <circle cx="9" cy="7" r="4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Huấn luyện viên đang hoạt động */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">HLV đang hoạt động</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{userCoachCount}</p>
              <div className="flex items-center mt-2">
                <svg className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M16 7h6v6" />
                  <path d="m22 7-8.5 8.5-5-5L2 17" />
                </svg>
                <span className="text-sm ml-1 text-green-600">+3% so với tháng trước</span>
              </div>
            </div>
            <div className="bg-green-500 p-3 rounded-lg">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="m16 11 2 2 4-4" />
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Tooneg doanh thu */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tổng doanh thu</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {formatRevenue(revenue)}
              </p>
              <div className="flex items-center mt-2">
                <svg className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M16 7h6v6" />
                  <path d="m22 7-8.5 8.5-5-5L2 17" />
                </svg>
                <span className="text-sm ml-1 text-green-600">+28% so với tháng trước</span>
              </div>
            </div>
            <div className="bg-purple-500 p-3 rounded-lg">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M3 10h18" />
              </svg>
            </div>
          </div>
        </div>

        {/* Tài nguyên đang chờ duyệt */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Số tài nguyên</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{numberBlog}</p>
              <div className="flex items-center mt-2">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M16 7h6v6" />
                  <path d="m22 7-8.5 8.5-5-5L2 17" />
                </svg>
                <span className="text-sm ml-1 text-gray-600">+5 so với tháng trước</span>
              </div>
            </div>
            <div className="bg-orange-500 p-3 rounded-lg">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                <path d="M10 9H8" />
                <path d="M16 13H8" />
                <path d="M16 17H8" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
