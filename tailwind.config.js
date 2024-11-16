/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        eduAustralia: ['Edu AU VIC WA NT Pre', 'cursive'],
        sourGummy: ['Sour Gummy', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
