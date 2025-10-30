import React, { useState, useEffect } from "react";
import {
  Video,
  Clock,
  User,
  FileText,
  ExternalLink,
  X,
  Plus,
} from "lucide-react";
import ScheduleModal from "../others/ScheduleModal";
import { useAuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import API from "../../api";
dayjs.locale("vi");

export default function ScheduleTab() {


  const today = dayjs();
  const startOfWeek = today.startOf("week"); // Chủ nhật (CN) theo locale
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, "day"));
  const [openModal, setOpenModal] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);


  // 🧩 Loading & confirm state
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingCancel, setLoadingCancel] = useState(null);
  const [confirmCancel, setConfirmCancel] = useState(null);

  const { user } = useAuthContext();
  const coachID = user?.coach?.userID;
  const googleAccessToken = localStorage.getItem("googleToken");


  // 🟢 Lấy danh sách slot trống của coach
  const fetchCoachAvailabilities = async () => {
    if (!coachID) return;
    try {
      const res = await API.get(`/identity/availability/available-slots?userID=${coachID}`);
      const slots = res?.data?.data || res?.data || [];
      const now = dayjs();

      const mappedSchedules = slots
        .filter((slot) => {
          const slotTime = dayjs(slot.availabilityDatetime);
          return slot.status === "AVAILABLE" && slotTime.isAfter(now);
        })
        .map((slot) => ({
          id: slot.availabilityID,
          appointmentDateTime: slot.availabilityDatetime,
          isAvailable: true,
        }))
        .sort((a, b) =>
          dayjs(a.appointmentDateTime).isAfter(dayjs(b.appointmentDateTime))
            ? 1
            : -1
        );

      setSchedules(mappedSchedules);
    } catch (error) {
      console.error("❌ Lỗi khi tải availabilities:", error);
    }
  };

  // 🟢 Lấy danh sách buổi hẹn
  const fetchAppointments = async () => {
    if (!user?.userID) return;
    setLoading(true);
    try {
      const res = await API.get(`/identity/appointment/my-appointments/${user.userID}`);
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


  // 🟢 Đặt buổi hẹn
  const handleCreateAppointment = async (appointment) => {
    setLoadingCreate(true);
    try {
      if (!coachID) {
        toast.error("Không tìm thấy Coach ID!");
        return;
      }

      const payload = {
        notes: appointment.notes,
        appointmentDateTime: appointment.appointmentDateTime,
        coachID,
        googleAccessToken,
      };

      await API.post("/identity/appointment", payload);

      toast.success("Đặt lịch thành công!");
      setOpenModal(false);
      fetchCoachAvailabilities();
      await fetchAppointments();
    } catch (error) {
      console.error("❌ Lỗi khi đặt lịch:", error);
      toast.error(
        error.messageFromServer || "Lỗi khi đặt lịch. Vui lòng thử lại."
      );
    } finally {
      setLoadingCreate(false);
    }
  };

  // 🟢 Xác nhận hủy
  const handleConfirmCancel = (appointment) => {
    setConfirmCancel(appointment);
  };

  // 🟢 Hủy buổi hẹn
  const handleCancel = async (appointmentID) => {
    setLoadingCancel(appointmentID);
    try {
      if (!googleAccessToken) {
        toast.error("Không tìm thấy Google Access Token!");
        return;
      }

      const res = await API.delete(`/identity/appointment/${appointmentID}/google/${googleAccessToken}`);

      if (res.status === 200) {
        toast.success("Hủy buổi hẹn thành công!");
        setAppointments((prev) =>
          prev.filter((a) => a.appointmentID !== appointmentID)
        );
        fetchCoachAvailabilities();
      } else {
        toast.error("Không thể hủy buổi hẹn. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Lỗi khi hủy buổi hẹn:", error);
      toast.error("Đã xảy ra lỗi khi hủy buổi hẹn!");
    } finally {
      setLoadingCancel(null);
      setConfirmCancel(null);
    }
  };

  const filteredAppointments = appointments.filter((a) => {
    const appointmentTime = dayjs(a.appointmentDateTime);
    if (!selectedDay) {
      // Nếu không chọn ngày cụ thể → hiện tất cả (hiện tại và tương lai)
      return appointmentTime.isAfter(dayjs());
    }
    // Nếu chọn 1 ngày → chỉ lấy lịch của ngày đó
    return appointmentTime.isSame(selectedDay, "day");
  });


  // 🟢 Gọi API khi load trang
  useEffect(() => {
    if (user?.userID) {
      fetchAppointments();
    }
  }, [user]);

  useEffect(() => {
    if (coachID) {
      fetchCoachAvailabilities();
    }
  }, [coachID]);

  return (
    <div className="p-6">
      <div className="space-y-8">
        {/* Modal đặt lịch */}
        <ScheduleModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          schedules={schedules}
          coachID={coachID}
          googleAccessToken={googleAccessToken}
          onSubmit={handleCreateAppointment}
        />

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {selectedDay
                ? `Lịch họp ngày ${selectedDay.format("DD/MM/YYYY")}`
                : "Tất cả lịch họp sắp tới"}
            </h3>
            <p className="text-gray-600">
              Quản lý các buổi huấn luyện và đặt lịch mới
            </p>
          </div>

          <button
            onClick={() => {
              fetchCoachAvailabilities();
              setOpenModal(true);
            }}
            disabled={loadingCreate}
            className={`bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold 
            hover:shadow-lg transition-all duration-200 flex items-center gap-2
            ${loadingCreate
                ? "opacity-70 cursor-not-allowed"
                : "hover:scale-105"
              }`}
          >
            {loadingCreate ? (
              <span>⏳ Đang tạo...</span>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Đặt buổi hẹn
              </>
            )}
          </button>
        </div>

        {/* Danh sách buổi hẹn */}
        <div className="space-y-4">
          {loading ? (
            <p className="text-gray-500 italic">Đang tải danh sách...</p>
          ) : filteredAppointments.length === 0 ? (
            <p className="text-gray-500 italic">
              {selectedDay
                ? `Không có buổi hẹn trong ngày ${selectedDay.format("DD/MM/YYYY")}.`
                : "Bạn chưa có buổi hẹn nào."}
            </p>
          ) : (
            filteredAppointments.map((a) => (
              <div
                key={a.appointmentID}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                      <Video className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">
                          {dayjs(a.appointmentDateTime).format("dddd, DD/MM/YYYY")}
                        </h3>
                        <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium capitalize">
                          {a.status === "AVAILABLE" ? "Đã xác nhận" : "Đã hủy"}
                        </span>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>
                            {dayjs(a.appointmentDateTime).format("HH:mm")} (60 phút)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>
                            với HLV {a.coach?.fullName || "Không xác định"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <span>Gọi video</span>
                        </div>
                      </div>
                      {a.notes && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">{a.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <a
                      href={a.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Tham gia buổi học
                    </a>

                    <button
                      onClick={() => handleConfirmCancel(a)}
                      disabled={loadingCancel === a.appointmentID}
                      className={`border border-red-300 text-red-700 px-4 py-2 rounded-lg text-sm font-semibold 
                ${loadingCancel === a.appointmentID
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-red-50"
                        } 
                transition-all duration-200 flex items-center gap-2`}
                    >
                      {loadingCancel === a.appointmentID ? (
                        <span>⏳ Đang hủy...</span>
                      ) : (
                        <>
                          <X className="h-4 w-4" />
                          Hủy buổi hẹn
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Lịch tuần */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Tuần này</h3>
          <div className="grid grid-cols-7 gap-2">
            {daysOfWeek.map((day, i) => {
              const isToday = day.isSame(today, "day");
              const isSelected = selectedDay && day.isSame(selectedDay, "day");
              return (
                <div className="text-center" key={day.format("DD-MM")}>
                  <div className="text-sm font-medium text-gray-500 mb-2">
                    {["T2", "T3", "T4", "T5", "T6", "T7", "CN"][i]}
                  </div>
                  <div
                    onClick={() => setSelectedDay(day)} // 👈 chọn ngày
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm transition-colors duration-200 cursor-pointer 
              ${isSelected
                        ? "bg-emerald-600 text-white font-bold"
                        : isToday
                          ? "bg-emerald-400 text-white font-bold"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    {day.date()}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 text-center">
            <button
              onClick={() => setSelectedDay(null)} // 👈 reset để xem tất cả
              className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
            >
              Xem tất cả lịch họp
            </button>
          </div>
        </div>

      </div>

      {/* 🧩 Popup xác nhận hủy */}
      {confirmCancel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-[400px]">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Xác nhận hủy buổi hẹn
            </h3>
            <p className="text-gray-600 mb-6">
              Bạn có chắc chắn muốn hủy buổi hẹn vào{" "}
              <strong>
                {dayjs(confirmCancel.appointmentDateTime).format(
                  "HH:mm, DD/MM/YYYY"
                )}
              </strong>{" "}
              không?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmCancel(null)}
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium"
              >
                Quay lại
              </button>
              <button
                onClick={() => handleCancel(confirmCancel.appointmentID)}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 font-semibold"
              >
                Xác nhận hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
