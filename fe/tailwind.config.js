/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "darkModeBG": "#14142C",
        "darkModeBorderBG": "#2A2A44"
      }
    },
  },
  plugins: [],
}