/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'blue': '#6DA8E7',
      'pink': '#E76F6D',
      'pink-light': '#FFE9E8',
      'black': '#000',
      'white': '#fff',
      'grey': '#9D9D9D',
    },
    extend: {
      borderRadius: {
      '4xl': '2rem',
      'otp': '15px',
      'main': '20px'
    }},
  },
  plugins: [    
    require("@tailwindcss/forms")({
      strategy: 'base', // only generate global styles
      strategy: 'class', // only generate classes
    }),
],
}

