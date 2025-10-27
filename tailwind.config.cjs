// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(0%)' },
          '50%': { transform: 'translateY(256px)' }, // h-64 = 256px
          '100%': { transform: 'translateY(0%)' },
        },
      },
      animation: {
        scan: 'scan 3s ease-in-out infinite',
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
