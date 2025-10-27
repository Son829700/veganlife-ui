import React from "react";
import { HandHeart, Lightbulb, Users, Globe } from "lucide-react";

const coreValues = [
  {
    title: "Thấu cảm là ưu tiên",
    desc: "Hành trình của mỗi người là khác nhau, và chúng tôi sẵn sàng đồng hành cùng bạn từ nơi bạn bắt đầu với sự thấu hiểu và hỗ trợ.",
    bg: "bg-gradient-to-r from-pink-500 to-rose-500",
    icon: HandHeart,
  },
  {
    title: "Hiểu biết tạo sự rõ ràng",
    desc: "Chúng tôi cung cấp kiến thức thay vì áp lực, giúp bạn có đủ thông tin để đưa ra lựa chọn đúng đắn.",
    bg: "bg-gradient-to-r from-yellow-500 to-orange-500",
    icon: Lightbulb,
  },
  {
    title: "Cộng đồng & Kết nối",
    desc: "Bạn không phải đơn độc. Cộng đồng của chúng tôi ở đây để đồng hành và chia sẻ mọi bước tiến của bạn.",
    bg: "bg-gradient-to-r from-blue-500 to-indigo-500",
    icon: Users,
  },
  {
    title: "Mục đích vượt lên trên chế độ ăn",
    desc: "Chúng tôi được truyền cảm hứng từ sức khỏe, tính bền vững môi trường và lòng từ bi với mọi sinh vật.",
    bg: "bg-gradient-to-r from-emerald-500 to-green-600",
    icon: Globe,
  },
];
export default function Brand() {
  return (
    <>
      {/* Sứ mệnh của chúng tôi */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Sứ mệnh của chúng tôi
              </h2>
              <div className="bg-white p-8 rounded-3xl shadow-lg">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Chúng tôi tin rằng lối sống thuần chay nên đơn giản, dễ tiếp cận và truyền cảm hứng — không gây áp lực. Sứ mệnh của chúng tôi là hướng dẫn, giáo dục và trao quyền cho mọi người trong suốt hành trình chuyển đổi với sự hỗ trợ cá nhân hóa và thông tin đáng tin cậy.
                </p>
              </div>
              <div className="mt-8 bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-2xl border border-emerald-100">
                <p className="text-emerald-800 font-semibold text-lg italic">
                  "Chúng tôi tin rằng mỗi bước nhỏ hướng đến lối sống xanh là một bước đến một bạn khỏe mạnh hơn, một thế giới nhân ái hơn, và một tương lai bền vững hơn."
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/Food.png"
                alt="Nguyên liệu thực vật tươi"
                className="rounded-3xl shadow-2xl w-full"
              />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full opacity-20 blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Vì sao chúng tôi bắt đầu Vegan Life */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <img
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Cộng đồng hỗ trợ"
                className="rounded-3xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-20 blur-2xl" />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Vì sao chúng tôi bắt đầu Vegan Life
              </h2>
              <div className="bg-gray-50 p-8 rounded-3xl">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Vegan Life được hình thành từ ý tưởng rằng ăn thực vật không chỉ là về thức ăn — mà còn là xây dựng một lối sống phù hợp với giá trị và mục tiêu sức khỏe của bạn. Chúng tôi nhận ra những khó khăn mà người mới thường gặp phải: bối rối, thiếu hướng dẫn và quá nhiều thông tin nhiễu loạn. Vì vậy, chúng tôi tạo ra một không gian cá nhân, dựa trên khoa học và được cộng đồng hỗ trợ.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Giá trị cốt lõi */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Giá trị cốt lõi
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Những nguyên tắc định hướng mọi hành động và tương tác của chúng tôi
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-3xl shadow-lg text-center group hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 rounded-2xl ${value.bg} flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-200`}
                >
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

