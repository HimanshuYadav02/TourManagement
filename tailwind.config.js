/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#F0F7F4',
          100: '#DBEDE6',
          200: '#B8DBCF',
          300: '#8AC1B1',
          400: '#5BA390',
          500: '#3A8573',
          600: '#1D6453',
          700: '#154B3E',
          800: '#0F382C', // Primary Forest Green
          900: '#08221A', // Deep Jungle
        },
        gold: {
          100: '#FAF4E6',
          200: '#F3E4C1',
          300: '#EBD196',
          400: '#DDBB6B',
          500: '#C5A059', // Muted Royal Gold
          600: '#A9853C',
          700: '#8A6A2C',
        },
        ivory: '#FDFBF7',
        sand: {
          50: '#FAF7F2',
          100: '#F5EFE6',
          200: '#EAE1D2',
          300: '#D5C8B4',
        },
        charcoal: {
          500: '#64706B',
          700: '#333D39',
          800: '#202624',
          900: '#141716',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(15, 56, 44, 0.08)',
        'luxury-hover': '0 25px 50px -12px rgba(15, 56, 44, 0.16)',
      }
    },
  },
  plugins: [],
}
