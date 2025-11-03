import React, { useEffect, useState } from "react";
import API from "../../api";
const CoachingList = ({ selectedCoachId, setSelectedCoachId }) => {
    const [coachesData, setCoachesData] = useState([]);


    // Danh sách fallback (cứng)
    const fallbackCoaches = [
        {
            id: 1,
            name: "Dr. Maya Chen",
            title: "Chuyên gia Dinh dưỡng Thuần chay",
            image:
                "https://images.pexels.com/photos/3760790/pexels-photo-3760790.jpeg?auto=compress&cs=tinysrgb&w=400",
            description:
                "Chuyên về dinh dưỡng dựa trên bằng chứng và giúp khách hàng tối ưu sức khỏe qua ăn uống thuần chay.",
            hashtags: ["#DinhDưỡng", "#SứcKhỏe", "#KhoaHọc"],
            rating: 4.9,
            years: "8+ năm",
            clients: "300+ khách hàng",
            badgeIcon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-heart h-5 w-5 text-white"
                >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
            ),
            badgeColor: "bg-gradient-to-r from-pink-500 to-rose-500",
        },
        {
            id: 2,
            name: "Alex Rodriguez",
            title: "Huấn luyện viên Thể hình & Hiệu suất",
            image:
                "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=400",
            description:
                "Giúp các vận động viên và người yêu thể thao phát triển với chế độ thuần chay.",
            hashtags: ["#ThểHình", "#HiệuSuất", "#VậnĐộngViên"],
            rating: 4.8,
            years: "6+ năm",
            clients: "250+ khách hàng",
            badgeIcon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-zap h-5 w-5 text-white"
                >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
            ),
            badgeColor: "bg-gradient-to-r from-orange-500 to-red-500",
        },
        // ... giữ nguyên các coach khác như bạn đã viết
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await API.get(
                    `/users/role/COACH`
                );
               const response = res?.data?.data || res?.data || [];

                // Nếu response là mảng hợp lệ thì set, không thì fallback
                if (Array.isArray(response) && response.length > 0) {
                    const mapped = response.map((coach, idx) => ({
                        id: coach.userID || idx + 100, // tránh trùng id fallback
                        name: coach.fullName || `Coach ${idx + 1}`,
                        title: coach.title || "Huấn luyện viên",
                        image:
                            coach.image ||
                            fallbackCoaches[idx % fallbackCoaches.length].image,
                        description:
                            coach.description ||
                            "Huấn luyện viên chuyên môn, hỗ trợ khách hàng.",
                        hashtags: coach.hashtags || ["#ThểHình", "#DinhDưỡng", "#VậnĐộngViên"],
                        rating: coach.rating || 4.5,
                        years: coach.years || "3+ năm",
                        clients: coach.clients || "100+ khách hàng",
                        badgeIcon: fallbackCoaches[idx % fallbackCoaches.length].badgeIcon,
                        badgeColor: fallbackCoaches[idx % fallbackCoaches.length].badgeColor,
                    }));
                    setCoachesData(mapped);
                } else {
                    setCoachesData(fallbackCoaches);
                }
            } catch (error) {
                console.error("Fetch error in CoachingList:", error);
                setCoachesData(fallbackCoaches);
            }
        };
        fetchData();
    }, []);

    // Dùng data từ API nếu có, nếu không thì fallback
    const coaches = coachesData.length > 0 ? coachesData : fallbackCoaches;

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Chọn Huấn luyện viên của bạn
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Chọn chuyên gia phù hợp với mục tiêu và phong cách của bạn.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-8">
                    {coaches.map((coach) => {
                        const isSelected = selectedCoachId === coach.id;
                        return (
                            <div
                                key={coach.id}
                                className={`flex flex-col h-full relative bg-white rounded-3xl shadow-lg p-6 text-center transition-all duration-300 cursor-pointer group ${
                                    isSelected
                                        ? "ring-2 ring-emerald-500 shadow-2xl scale-105 bg-gradient-to-br from-emerald-50 to-green-50"
                                        : "hover:shadow-2xl hover:scale-105 hover:-translate-y-2"
                                }`}
                                onClick={() => setSelectedCoachId(coach.id)}
                            >
                                {/* Avatar */}
                                <div className="relative mb-6">
                                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                                        <img
                                            src={"/coach.jpg" || coach.image}
                                            alt={coach.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                    <div
                                        className={`absolute -bottom-2 -right-2 w-10 h-10 ${coach.badgeColor} rounded-full flex items-center justify-center shadow-lg`}
                                    >
                                        {coach.badgeIcon}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {coach.name}
                                </h3>
                                <p className="text-emerald-600 font-semibold mb-3">
                                    {coach.title}
                                </p>
                                <div className="flex flex-wrap gap-1 justify-center mb-4">
                                    {coach.hashtags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                                    {coach.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CoachingList;
