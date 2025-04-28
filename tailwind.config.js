/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Removed custom "times" font
      fontFamily: {
        profile: ['Georgia', 'serif'], // exact look from Profile
        sans: ['ui-sans-serif', 'system-ui', 'sans-serif'], // default Tailwind
      }      
    },
  },
  plugins: [],
};
