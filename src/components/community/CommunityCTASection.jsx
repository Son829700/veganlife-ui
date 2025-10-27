import React from "react";

const CommunityCTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-emerald-500 to-green-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Sẵn sàng tham gia cộng đồng của chúng tôi?
        </h2>
        <p className="text-xl text-emerald-100 mb-8">
          Hãy trở thành một phần của mạng lưới gắn kết, nơi mọi người cùng nhau
          thay đổi cuộc sống thông qua lối sống thuần chay. Hành trình của bạn
          bắt đầu chỉ với một bước đơn giản.
        </p>
        <a
          href="https://www.facebook.com/share/g/1GExtoYVFG/"
          data-discover="true"
          className="bg-white text-emerald-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 inline-flex items-center group"
        >
          Tham gia cộng đồng
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
            className="lucide lucide-arrow-right ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default CommunityCTASection;
