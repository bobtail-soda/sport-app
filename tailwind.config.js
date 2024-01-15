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
      'black': '#000',
      'white': '#fff',
      'grey': '#E2E2E2',
      'grey-dark': '#9D9D9D'
    },
    extend: {
      borderRadius: {
      '4xl': '2rem',
      'otp': '15px',
      'card' : '20px 20px 20px 20px',
      'text-top': '20px 20px 0 0',
    }},
  },
  plugins: [    
    require("@tailwindcss/forms")({
      strategy: 'base', // only generate global styles
      strategy: 'class', // only generate classes
    }),
],
}

