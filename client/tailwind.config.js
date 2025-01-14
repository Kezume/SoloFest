/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "#7370FB",
      secondary: "#A493F9",
      cp3: "#CDC1FF",
    }),

    textColor: (theme) => ({
      ...theme("colors"),
      primary: "#7370FB",
      secondary: "#A493F9",
      cp3: "#CDC1FF",
    }),

    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      mobile: { max: "639px" },
      tablet: { min: "640px", max: "1023px" },
      desktop: { min: "1024px" },
    },
  },
  plugins: [],
};
