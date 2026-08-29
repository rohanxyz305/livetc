/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#101820',
          50: '#1e2936',
          100: '#17222d',
          200: '#131c26',
          300: '#101820',
          400: '#0c1219',
          500: '#080c11',
        },
        yellowAccent: {
          DEFAULT: '#FEE715',
          50: '#fffee6',
          100: '#fffdb3',
          200: '#fffb80',
          300: '#fff84d',
          400: '#FEE715',
          500: '#d6c000',
          600: '#a39200',
        },
        brand: {
          50: '#fffee6',
          100: '#fffdb3',
          200: '#fffb80',
          300: '#FEE715',
          400: '#FEE715',
          500: '#FEE715',
          600: '#d6c000',
          700: '#a39200',
          800: '#17222d',
          900: '#101820',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['Sora', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        yellowGlow: '0 10px 35px -5px rgba(254, 231, 21, 0.45)',
        obsidianGlow: '0 20px 60px -15px rgba(16, 24, 32, 0.7)',
        soft: '0 10px 40px -15px rgba(16,24,32,0.18)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'marquee': 'marquee 35s linear infinite',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      }
    },
  },
  plugins: [],
}
