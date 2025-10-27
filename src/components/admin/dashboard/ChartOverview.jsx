import React, { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";

const ChartOverview = () => {
  const [userList, setUserList] = useState([]);
  const { get } = useFetch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get(`http://localhost:8080/identity/users`);
        setUserList(response);
        console.log("Fetched users:", response);
      } catch (error) {
        console.error("Fetch error in ChartOverview:", error);
      }
    };

    fetchData();
  }, [get]);



  // ===============================
  // 🧮 Xử lý dữ liệu user theo tháng
  // ===============================
  const now = dayjs();
  const last6Months = Array.from({ length: 6 }, (_, i) =>
    now.subtract(5 - i, "month")
  );

  const userCountByMonth = last6Months.map((month) => {
    const monthNumber = month.month(); // 0-11
    const year = month.year();

    const count = userList.filter((user) => {
      if (!user.createdAt || user.role !== "USER") return false;
      const created = dayjs(user.createdAt);
      return created.month() === monthNumber && created.year() === year;
    }).length;

    return {
      tháng: month.format("MM/YYYY"),
      ngườiDùng: count,
    };
  });

  // ===============================
  // 📊 Dữ liệu cho biểu đồ Bar (phân bổ gói)
  // ===============================
  const userFreeCount = userList.filter(
    (user) => user.role === "USER" && user.plan === "FREE"
  ).length;

  const userPremiumCount = userList.filter(
    (user) => user.role === "USER" && user.plan === "PREMIUM"
  ).length;

  const planData = [
    { gói: "Miễn phí", sốLượng: userFreeCount },
    { gói: "Cao cấp", sốLượng: userPremiumCount },
  ];

  // ===============================
  // 📈 Render giao diện
  // ===============================
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Biểu đồ người dùng theo tháng */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Số lượng người dùng mới theo tháng
          </h3>
          <span className="text-sm text-gray-500">
            (6 tháng gần nhất)
          </span>
        </div>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={userCountByMonth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="tháng" />
              <YAxis allowDecimals={false} />
              <Tooltip
                formatter={(value) => `${value} người`}
                labelFormatter={(label) => `Tháng ${label}`}
              />
              <Line
                type="monotone"
                dataKey="ngườiDùng"
                stroke="#22C55E"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Biểu đồ phân bổ gói */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Phân bổ gói sử dụng
        </h3>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={planData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="gói" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sốLượng" fill="#22C55E" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartOverview;
