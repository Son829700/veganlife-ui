import React from "react";

const ManageSessionsPage = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Sessions</h1>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="lucide lucide-calendar h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M3 10h18" />
          </svg>
          <span>Schedule Session</span>
        </button>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-4">
          <svg
            className="lucide lucide-funnel h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z" />
          </svg>
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
            <option value="all">All Sessions</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Session List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming & Recent Sessions</h3>
        </div>

        <div className="p-6 space-y-4">
          {/* Session Card */}
          {[
            {
              title: "Consultation Session",
              status: "Scheduled",
              statusColor: "bg-blue-100 text-blue-800",
              date: "12/20/2024",
              time: "10:00 (60 min)",
              participants: "Dr. Lisa Green → Sarah Johnson",
              notes: "Initial nutrition assessment",
              actions: ["View Details", "Reschedule"],
            },
            {
              title: "Meal Planning Session",
              status: "Scheduled",
              statusColor: "bg-blue-100 text-blue-800",
              date: "12/21/2024",
              time: "14:00 (45 min)",
              participants: "Marcus Williams → Mike Chen",
              notes: "",
              actions: ["View Details", "Reschedule"],
            },
            {
              title: "Fitness Session",
              status: "Completed",
              statusColor: "bg-green-100 text-green-800",
              date: "12/18/2024",
              time: "16:00 (60 min)",
              participants: "Dr. Lisa Green → Emma Davis",
              notes: "Workout plan review",
              actions: ["View Details"],
            },
          ].map((session, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <h4 className="text-lg font-medium text-gray-900">
                      {session.title}
                    </h4>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${session.statusColor}`}
                    >
                      {session.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <CalendarIcon />
                      <span>{session.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ClockIcon />
                      <span>{session.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <UserIcon />
                      <span>{session.participants}</span>
                    </div>
                  </div>
                  {session.notes && (
                    <div className="mt-2 text-sm text-gray-600">
                      <strong>Notes:</strong> {session.notes}
                    </div>
                  )}
                </div>
                <div className="flex space-x-2 ml-4">
                  {session.actions.map((action, idx) => (
                    <button
                      key={idx}
                      className={classNames(
                        "text-sm font-medium",
                        action === "View Details"
                          ? "text-green-600 hover:text-green-800"
                          : "text-blue-600 hover:text-blue-800"
                      )}
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-sm text-gray-500">Showing 3 sessions</div>
    </div>
  );
};

const CalendarIcon = () => (
  <svg
    className="lucide lucide-calendar h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
  </svg>
);

const ClockIcon = () => (
  <svg
    className="lucide lucide-clock h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 6v6l4 2" />
    <circle cx="12" cy="12" r="10" />
  </svg>
);

const UserIcon = () => (
  <svg
    className="lucide lucide-user h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const classNames = (...classes) => classes.filter(Boolean).join(" ");

export default ManageSessionsPage;
