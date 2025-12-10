/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ubuntu: {
          orange: "#E95420", // Accent Orange
          grey: "#2C2C2C",   // Dark Header/Sidebar
          warm: "#772953",   // Aubergine (Backgrounds)
          light: "#FFFFFF",  // Window Background Light
          dark: "#333333",   // Window Background Dark
        }
      },
      fontFamily: {
        ubuntu: ["Ubuntu", "sans-serif"],
      },
    },
  },
  plugins: [],
}
