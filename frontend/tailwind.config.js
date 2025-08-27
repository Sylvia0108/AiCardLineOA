/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#2561e8',
          light: '#85a4ff',
          button: '#2263eb',
          hover: '#1d4ed8'
        },
        background: {
          gray: '#E3E3E3'
        },
        text: {
          white: '#ffffff',
          button: '#F5F5F5'
        }
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'inter': ['Inter', 'sans-serif']
      },
      boxShadow: {
        'card': '0px 0px 11.9px -2px rgba(0, 0, 0, 0.3), 0px 0px 6px 9px rgba(0, 0, 0, 0.1)'
      },
      backgroundImage: {
        'header-gradient': 'linear-gradient(90deg, rgba(16, 163, 233, 1) 0%, rgba(37, 100, 234, 1) 100%)',
        'card-gradient': 'linear-gradient(160deg, rgba(37, 97, 232, 1) 17%, rgba(133, 164, 255, 1) 55%)'
      }
    },
  },
  plugins: [],
}
