/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        itim: ['Itim'],
        grapeNuts: ['Grape Nuts'],
        rubik: ['Rubik', 'sans-serif']
      },
    },  
  },
  plugins: [],
}