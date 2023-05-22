/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'tablet': '768px',  
        'laptop': '1024px',
        'desktop': '1920px',
      },
      colors: {
        'current': 'currentColor',
        'baseOrange': '#f06236'
      },
      gridTemplateColumns : {
        autofit: "repeat(auto-fit, minmax(270px, 1fr));"
      }
    },
  },
  plugins: [],
}