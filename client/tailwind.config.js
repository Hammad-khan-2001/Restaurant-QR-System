// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7C4A2F",     // Dark Brown
        secondary: "#A67856",   // Light Brown
        accent: "#D9B08C",      // Warm Highlight
        bg: "#F5EFE6",          // Page Background
        card: "#FFF8F0",        // Card Background
        textDark: "#4B382A",    // Headings
        textLight: "#7D5A3C",   // Body
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
