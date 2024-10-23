/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        peach: "#E54065",
        "light-gray-1": "#F4F5F9",
        "light-gray-2": "#CFD2DC",
        "light-gray-3": "#E1E4EA",
        "light-gray-4": "#F2F2F2",
        "light-black-1": "#636363",
      },
    },
  },
  plugins: [],
};
