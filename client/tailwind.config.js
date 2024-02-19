/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1C1C1B",
        secondary: "#272727",
        third: "#181817",
        texPrimary: "#B5B5B5",
        textSecondary: "#FDFDFD",
        heroPrimary: "#FF9E01",
        heroSecondary: "#F77801",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
  ],
}

