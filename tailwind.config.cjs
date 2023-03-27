const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        unbounded: "Unbounded",
      },
      fontSize: {
        body: "1rem",
        "body-2": "0.875rem",
        h3: "2rem",
        h4: "1.25rem",
        h5: "1rem",
      },
      spacing: {
        18: "4.5rem",
        112: "28rem",
        120: "30rem",
      },
      colors: {
        bg: { default: "#F5F4F4" },
        "p-pink": { 100: "#FFE4F3", 600: "#CB006C" },
        "p-purple": { 100: "#F3F5FB", 900: "#1C0533" },
        primary: "#E6007A",
        secondary: "#321D47",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
  ],
}
