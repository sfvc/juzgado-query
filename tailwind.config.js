import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      backgroundColor: {
        'dark': '#1e293b'
      }
    },

  },
  plugins: [
    flowbite.plugin(),
  ],
}