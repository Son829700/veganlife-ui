import React, { useState } from "react";
import { Check } from "lucide-react";

export default function ScheduleModal({
  open,
  onClose,
  schedules = [],
  coachID,
  googleAccessToken,
  onSubmit,
}) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [notes, setNotes] = useState("");

  if (!open) return null;

  // 👉 Gom lịch theo ngày
  const groupedByDay = schedules.reduce((acc, slot) => {
    const date = new Date(slot.appointmentDateTime).toLocaleDateString("vi-VN");
    if (!acc[date]) acc[date] = [];
    acc[date].push(slot);
    return acc;
  }, {});

  const handleConfirm = () => {
    if (!selectedSlot) {
      alert("Vui lòng chọn một khung giờ!");
      return;
    }

    const appointment = {
      notes,
      appointmentDateTime: selectedSlot,
      coachID,
      googleAccessToken,
    };

    onSubmit?.(appointment);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-4xl animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Đặt lịch hẹn với huấn luyện viên
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            &times;
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mb-4 border rounded-lg">
          <table className="min-w-full border-collapse text-sm text-gray-700">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-3 py-2 text-center">Ngày</th>
                <th className="border px-3 py-2 text-center">Khung giờ</th>
                <th className="border px-3 py-2 text-center">Trạng thái</th>
                <th className="border px-3 py-2 text-center">Chọn</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(groupedByDay).length > 0 ? (
                Object.entries(groupedByDay).map(([date, slots]) =>
                  slots.map((slot, index) => {
                    const time = new Date(
                      slot.appointmentDateTime
                    ).toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    });

                    const isAvailable = slot.isAvailable;
                    const isSelected =
                      selectedSlot === slot.appointmentDateTime;

                    return (
                      <tr
                        key={slot.id}
                        className={`border-t hover:bg-green-50 transition ${
                          isSelected ? "bg-green-100" : ""
                        }`}
                      >
                        {index === 0 && (
                          <td
                            className="border px-3 py-2 text-center font-medium"
                            rowSpan={slots.length}
                          >
                            {date}
                          </td>
                        )}
                        <td className="border px-3 py-2 text-center">{time}</td>
                        <td className="border px-3 py-2 text-center">
                          {isAvailable ? "Còn trống" : "Đã đặt"}
                        </td>
                        <td
                          className="border px-3 py-2 text-center cursor-pointer"
                          onClick={() =>
                            isAvailable &&
                            setSelectedSlot(slot.appointmentDateTime)
                          }
                        >
                          {isSelected ? (
                            <div className="bg-green-500 text-white w-6 h-6 rounded-full mx-auto flex items-center justify-center">
                              <Check size={14} />
                            </div>
                          ) : (
                            isAvailable && (
                              <div className="border-2 border-green-500 w-6 h-6 rounded-full mx-auto" />
                            )
                          )}
                        </td>
                      </tr>
                    );
                  })
                )
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-4 text-gray-500 italic"
                  >
                    Không có khung giờ khả dụng
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Notes */}
        <textarea
          className="w-full border rounded-lg p-3 mb-4 text-sm focus:ring-2 focus:ring-green-500"
          placeholder="Ghi chú thêm (tùy chọn)..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        {/* Footer */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Hủy
          </button>
          <button
            onClick={handleConfirm}
            className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg hover:shadow-md hover:scale-105 transition"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
