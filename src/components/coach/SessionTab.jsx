import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useAuthContext } from "../../context/AuthContext";
import utc from "dayjs/plugin/utc";
import { Check } from "lucide-react";
import { toast } from "react-toastify";
import API from "../../api";

dayjs.extend(utc);

const SLOTS = {
  morning: [
    { label: "07:00 - 08:00", value: 7 },
    { label: "08:00 - 09:00", value: 8 },
    { label: "09:00 - 10:00", value: 9 },
    { label: "10:00 - 11:00", value: 10 },
  ],
  afternoon: [
    { label: "13:00 - 14:00", value: 13 },
    { label: "14:00 - 15:00", value: 14 },
    { label: "15:00 - 16:00", value: 15 },
    { label: "16:00 - 17:00", value: 16 },
  ],
};

const SessionTab = () => {
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]); // <-- Thêm state mới
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useAuthContext();

  const today = dayjs();

  // Lấy availability đã lưu từ API
  useEffect(() => {
    if (!user?.userID) return;

    const fetchData = async () => {
      const url = `/identity/availability/available-slots?userID=${user.userID}`;
      try {
        const data = await API.get(url);


        const datetimes = (data.data?.data || []).map(item => item.availabilityDatetime);

        setBookedSlots(datetimes);
      } catch (error) {
        console.error("Lỗi khi fetch availability:", error);
      }
    };

    fetchData();
  }, [user]);

  const getWeekDays = (offset = 0) => {
    const startOfWeek = dayjs().add(offset, "week").startOf("week");
    return Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, "day"));
  };

  const weekDays = getWeekDays(weekOffset);

  const toggleSlot = (day, hour) => {
    const key = `${day.format("YYYY-MM-DD")}_${String(hour).padStart(2, "0")}`; // ✅ Sửa ở đây
    const isAlreadyBooked = bookedSlots.some(
      (b) => dayjs.utc(b).local().format("YYYY-MM-DD_HH") === key
    );
    if (isAlreadyBooked) return;

    setSelectedSlots((prev) =>
      prev.includes(key) ? prev.filter((s) => s !== key) : [...prev, key]
    );
  };


  const handleSave = () => setShowModal(true);

  const confirmSave = async () => {
    try {
      const availabilityDatetime = selectedSlots.map((slot) => {
        const [date, hour] = slot.split("_");
        return dayjs(date)
          .hour(Number(hour))
          .minute(0)
          .second(0)
          .format("YYYY-MM-DDTHH:mm:ssZ");
      });

      const payload = { availabilityDatetime };

      // 🟢 Gọi POST bằng axios instance
      const result = await API.post("/identity/availability", payload);
      // console.log("Kết quả API:", result.data);

      toast.success("Lưu lịch rảnh thành công!");
      setSelectedSlots([]);

      // 🟢 Gọi GET lại danh sách lịch sau khi lưu
      const { data } = await API.get(`/identity/availability/available-slots`, {
        params: { userID: user.userID },
      });

      const datetimes = (data?.data || []).map(
        (item) => item.availabilityDatetime
      );

      setBookedSlots(datetimes);
    } catch (error) {
      console.error("❌ Lỗi khi lưu:", error);

      const message =
        error.response?.data?.message ||
        error.message ||
        "Lưu thất bại, vui lòng thử lại.";

      toast.error(`${message}`);
    } finally {
      setShowModal(false);
    }
  };

  const cancelSave = () => setShowModal(false);

  return (
    <div className="p-4">
      {/* Bộ chọn tuần */}
      <div className="flex justify-between items-center mb-4">
        <button
          disabled={weekOffset === 0}
          onClick={() => setWeekOffset(weekOffset - 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Tuần trước
        </button>
        <h2 className="text-xl font-semibold">
          {weekOffset === 0 ? "Tuần này" : `Tuần ${weekOffset + 1}`}
        </h2>
        <button
          onClick={() => setWeekOffset(weekOffset + 1)}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Tuần sau
        </button>
      </div>

      {/* Bảng lịch */}
      <div className="overflow-x-auto">
        <table className="border-collapse border border-gray-300 w-full text-sm">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Buổi</th>
              <th className="border border-gray-300 p-2">Giờ</th>
              {weekDays.map((day) => (
                <th
                  key={day.format("YYYY-MM-DD")}
                  className="border border-gray-300 p-2"
                >
                  {day.format("ddd DD/MM")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(SLOTS).map(([period, slots]) =>
              slots.map((slot, idx) => (
                <tr key={`${period}_${slot.value}`}>
                  {idx === 0 && (
                    <td
                      className="border border-gray-300 p-2 font-bold text-center"
                      rowSpan={slots.length}
                    >
                      {period === "morning" ? "Sáng" : "Chiều"}
                    </td>
                  )}
                  <td className="border border-gray-300 p-2">{slot.label}</td>
                  {weekDays.map((day) => {
                    const key = `${day.format("YYYY-MM-DD")}_${String(slot.value).padStart(2, "0")}`;
                    const isPreviouslyBooked = bookedSlots.some(
                      (b) => dayjs.utc(b).local().format("YYYY-MM-DD_HH") === key
                    );

                    const isSelected = selectedSlots.includes(key);
                    const isPast = day.isBefore(today, "day");
                    const isTodayPastSlot =
                      day.isSame(today, "day") && slot.value <= today.hour();
                    const disabled = isPast || isTodayPastSlot;

                    const cellStyle = disabled
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : isPreviouslyBooked
                        ? "bg-green-500 text-white cursor-not-allowed"
                        : isSelected
                          ? "bg-green-500 text-white"
                          : day.isSame(today, "day")
                            ? "bg-green-100 hover:bg-green-200"
                            : "hover:bg-gray-100";

                    return (
                      <td
                        key={key}
                        onClick={() =>
                          !disabled && !isPreviouslyBooked && toggleSlot(day, slot.value)
                        }
                        className={`border border-gray-300 p-2 text-center cursor-pointer ${cellStyle}`}
                      >
                        {isPreviouslyBooked || isSelected ? (
                          <Check className="mx-auto text-white w-5 h-5" />
                        ) : null}
                      </td>

                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Nút lưu */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={loading || selectedSlots.length === 0}
        >
          {loading ? "Đang lưu..." : "Lưu lịch rảnh"}
        </button>
      </div>

      {/* Modal xác nhận */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Xác nhận lưu lịch</h3>
            <p className="mb-4">
              Bạn có chắc muốn lưu {selectedSlots.length} slot đã chọn không?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelSave}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Huỷ
              </button>
              <button
                onClick={confirmSave}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Đang lưu..." : "Xác nhận"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionTab;
