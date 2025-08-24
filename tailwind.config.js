/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6878d6",
          50: "#f0f2ff",
          100: "#e8ebff",
          200: "#d4daff",
          300: "#b8c1ff",
          400: "#9ba6ff",
          500: "#6878d6",
          600: "#5862b8",
          700: "#484d99",
          800: "#3a3d7a",
          900: "#2d2f5c",
        },
        secondary: {
          DEFAULT: "#38b6ff",
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38b6ff",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}