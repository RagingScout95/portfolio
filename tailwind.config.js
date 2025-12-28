/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'red-primary': '#ef4444', // red-500
        'red-dark': '#dc2626', // red-600
        'red-darker': '#b91c1c', // red-700
        'red-light': '#f87171', // red-400
        'red-lighter': '#fca5a5', // red-300
      },
    },
  },
  plugins: [],
}





