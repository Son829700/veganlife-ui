import { useState, useEffect } from "react";
import CoachingDashboardHeader from "../../components/dashboard/CoachingDashboardHeader";
import DashboardTab from "../../components/dashboard/DashboardTab";
import MessagesTab from "../../components/dashboard/MessagesTab";
import ScheduleTab from "../../components/dashboard/ScheduleTab";
import SettingsTab from "../../components/dashboard/SettingsTab";
import { useAuthContext } from "../../context/AuthContext";
// Icon từ lucide-react
import { Target, MessageSquare, Calendar, Settings } from "lucide-react";

export default function CoachingDashboard() {
  const { user } = useAuthContext();
  const plan = user?.plan || "FREE";

  const [activeTab, setActiveTab] = useState(null);

  // 👉 Khi user hoặc plan thay đổi thì set tab mặc định
  useEffect(() => {
    if (plan === "FREE") {
      setActiveTab("settings");
    } else {
      setActiveTab("dashboard");
    }
  }, [plan]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab setActiveTab={setActiveTab}/>;
      case "messages":
        return <MessagesTab />;
      case "schedule":
        return <ScheduleTab />;
      case "settings":
        return <SettingsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <CoachingDashboardHeader />

      {/* Thanh điều hướng tab */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mt-6">
        <div className="border-b border-gray-200">
          <nav className="flex">
            {plan === "PREMIUM" && (
              <>
                <TabButton
                  label="Bảng điều khiển"
                  value="dashboard"
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  icon={<Target className="h-4 w-4" />}
                />
                <TabButton
                  label="Tin nhắn"
                  value="messages"
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  icon={<MessageSquare className="h-4 w-4" />}
                />
                <TabButton
                  label="Lịch biểu"
                  value="schedule"
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  icon={<Calendar className="h-4 w-4" />}
                />
              </>
            )}
            {/* Tab Settings luôn hiển thị */}
            <TabButton
              label="Cài đặt"
              value="settings"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              icon={<Settings className="h-4 w-4" />}
            />
          </nav>
        </div>

        {/* Nội dung từng tab */}
        <div className="p-6">{renderTabContent()}</div>
      </div>
    </div>
  );
}

function TabButton({ label, value, activeTab, setActiveTab, icon }) {
  const isActive = activeTab === value;
  const activeClass = isActive
    ? "text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50"
    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50";

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors duration-200 ${activeClass}`}
    >
      {icon}
      {label}
    </button>
  );
}
