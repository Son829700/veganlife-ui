import React from "react";
import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";



const ManageUserPage = () => {

  const [userList, setUserList] = React.useState([]);
  const { get } = useFetch();
  const userRole = userList.filter(user => user.role === 'USER');
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [planFilter, setPlanFilter] = React.useState("all");

  const filteredUsers = userList
    .filter(user => user.role === "USER") // chỉ lấy user thường
    .filter(user => {
      // Lọc theo từ khóa tìm kiếm (tên hoặc email)
      const keyword = searchTerm.toLowerCase();
      return (
        user.fullName?.toLowerCase().includes(keyword) ||
        user.email?.toLowerCase().includes(keyword)
      );
    })
    .filter(user => {
      // Lọc theo trạng thái
      if (statusFilter === "all") return true;
      return user.status?.toLowerCase() === statusFilter;
    })
    .filter(user => {
      // Lọc theo gói
      if (planFilter === "all") return true;
      return user.plan?.toLowerCase() === planFilter;
    });




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get(`http://localhost:8080/identity/users`);
        setUserList(response);
        console.log("Fetched users:", response);
      } catch (error) {
        console.error("Fetch error in ResourcePage:", error);
      }
    };

    fetchData();
  }, [get]);



  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Người dùng</h1>

      </div>

      {/* Bộ lọc */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="m21 21-4.34-4.34" />
              <circle cx="11" cy="11" r="8" />
            </svg>
            <input
              type="text"
              placeholder="Tìm người dùng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Hoạt động</option>
              <option value="inactive">Không hoạt động</option>
            </select>
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">Tất cả gói</option>
              <option value="free">Miễn phí</option>
              <option value="premium">Cao cấp</option>
            </select>
          </div>
        </div>
      </div>

      {/* Danh sách người dùng */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Người dùng</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gói</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Huấn luyện viên</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày tham gia</th>
                <th className="relative px-6 py-3"><span className="sr-only">Hành động</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user, index) => (

                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">

                        <img className="h-10 w-10 rounded-full" src={user.img || "/user.png"} alt={user.fullName} />

                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.fullName || user.username}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${user.plan === "FREE" ? 'bg-gray-100 text-gray-800' : 'bg-purple-100 text-purple-800'}`}>
                      {user.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.coach?.fullName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleString("vi-VN", {
                      timeZone: "Asia/Ho_Chi_Minh",
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                    
                    className="text-gray-400 hover:text-gray-600">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="19" cy="12" r="1" />
                        <circle cx="5" cy="12" r="1" />
                      </svg>
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="text-sm text-gray-500">
        Hiển thị {filteredUsers.length} / {userList.filter(u => u.role === "USER").length} người dùng
      </div>
    </div>
  );
};

export default ManageUserPage;
