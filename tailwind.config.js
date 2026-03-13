/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cyan': {
          400: '#00d4ff',
          500: '#00b8e6',
        }
      }
    },
  },
  plugins: [],
}
