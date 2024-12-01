/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'green-custom': '#04460ef7',
        'green-900': '#14532deb',
        'green-950': '#052e16b8'
      }
    },
  },
  plugins: [],
};
