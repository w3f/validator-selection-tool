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
        caption: "0.75rem",
        body: "1rem",
        "body-2": "0.875rem",
        h3: "2rem",
        h4: "1.25rem",
        h5: "1rem",
      },
      lineHeight: {
        "body-2": "2rem",
      },
      spacing: {
        18: "4.5rem",
        112: "28rem",
        120: "30rem",
      },
      colors: {
        bg: { default: "#F5F4F4", dip: "#E8E8E8" },
        "p-pink": { 100: "#FFE4F3", 600: "#CB006C" },
        "p-purple": { 100: "#F3F5FB", 900: "#1C0533" },
        primary: "#E6007A",
        secondary: "#321D47",
      },
      keyframes: {
        blur: {
          "0%": { backdropFilter: "blur(2px)" },
          "100%": { backdropFilter: "blur(16px)" },
        },
        fadeIn: {
          "0%": { background: "rgba(245,244,244,0)" },
          "100%": { background: "rgba(245,244,244,0.6)" },
        },
        rollUp: {
          "0%": { height: "180px" },
          "100%": { height: "fit-content" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
}
