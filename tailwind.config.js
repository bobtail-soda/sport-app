/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    colors: {
      'blue': '#6DA8E7',
      'pink': '#E76F6D',
      'pink-light': '#FFE9E8',
      'black': '#000',
      'white': '#fff',
      'grey': '#9D9D9D',
      'red': '#FF0101'
    },
    extend: {
      borderRadius: {
      '4xl': '2rem',
      'otp': '15px',
      'main': '20px',
      'card': '20px 20px 0 0',
      'summary': '0 0 17px 17px'
    }},
  },
  plugins: [    
    require("@tailwindcss/forms")({
      strategy: 'base', // only generate global styles
      strategy: 'class', // only generate classes
      
      
    }),
    require("tw-elements/dist/plugin.cjs"),
    

    
],darkMode: "class"
}
// TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com 


