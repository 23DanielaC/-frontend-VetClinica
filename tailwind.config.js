/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#64B5F6',
        'primary-dark': '#1E88E5',
        'primary-light': '#BBDEFB',
        accent: '#FFD54F',
        'accent-dark': '#F9A825',
        base: '#ECEFF1',
      }
    }
  },
  plugins: []
}
