/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#d7f0fd",
          200: "#b5e2f8",
          300: "#85ccef",
          400: "#4fb5e8",
          500: "#1c97d4",
          600: "#1a90cb",
          700: "#1780b5",
          800: "#0d628c",
          900: "#05405d",
        },
        secondary: {
          100: "#ffffcc",
          200: "#fffc99",
          300: "#fff566",
          400: "#ffeb33",
          500: "#fddb00",
          600: "#cc9c00",
          700: "#996600",
          800: "#804f00",
          900: "#5c3400",
        },
        tertiary: {
          500: "#33fff3",
        },
        gray: {
          50: "#eff4f6",
          100: "#dfe8ec",
          200: "#cbd7dc",
          300: "#b1bdc4",
          400: "#92a2aa",
          500: "#73848c",
          600: "#596a73",
          700: "#3b484f",
          800: "#212c31",
          900: "#0d1316",
        },
      },
      fontFamily: {
        sans: ["Instrument Sans", "system-ui", "sans"],
      },
      boxShadow: {
        insetSm: "0 2px 2px rgba(0, 0, 0, 0.15) inset",
        insetMd: "0 4px 4px rgba(0, 0, 0, 0.15) inset",
        sm: "0 2px 2px rgba(0, 0, 0, 0.15)",
        md: "0 4px 4px rgba(0, 0, 0, 0.15)",
        lg: "0 8px 8px rgba(0, 0, 0, 0.15)",
      },
      backgroundImage: {
        whiteHorizontal:
          "linear-gradient(to right, rgba(100% 100% 100% / 1) 0%, rgba(100% 100% 100% / 0) 64%)",
        whiteVertical:
          "linear-gradient(to bottom, rgba(100% 100% 100% / 1) 0%, rgba(100% 100% 100% / 0) 64%)",
      },
    },
  },
  plugins: [],
};
