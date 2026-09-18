/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#111111',
        background: '#FFFFFF',
        surface: '#F7F7F5',
        ink: '#111111',
        muted: '#6B6B6B',
        border: '#E5E5E3',
        accent: '#FF4B26',
        success: '#1F9254',
        error: '#D3352B',
        warning: '#E2A32D',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1280px',
      },
    },
  },
  plugins: [],
}