/ @type {import('tailwindcss').Config} /
module.exports = {
  content: [
    "./src/pages//.{js,ts,jsx,tsx}",
    "./src/components//.{js,ts,jsx,tsx}",
    "./src/app//.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "Liberation Mono", "Courier New", "monospace"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};