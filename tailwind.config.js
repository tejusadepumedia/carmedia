/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./Pages/**/*.{js,jsx}",
    "./Components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#d4a853", // The gold from your code
      },
    },
  },
  plugins: [],
}