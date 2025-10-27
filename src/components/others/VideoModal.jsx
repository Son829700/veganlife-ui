import React from "react";

export default function VideoModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
      onClick={onClose} // bấm ra ngoài thì đóng
    >
      <div
        className="relative bg-black rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()} // ngăn đóng khi bấm trong
      >
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-2xl hover:text-emerald-400 transition z-10"
        >
          ✕
        </button>

        {/* Video dạng dọc */}
        <video
          controls
          autoPlay
          playsInline
          className="max-h-[90vh] max-w-[90vw] object-contain rounded-2xl"
        >
          <source src="/Intro.mp4" type="video/mp4" />
          Trình duyệt của bạn không hỗ trợ phát video.
        </video>
      </div>
    </div>
  );
}
