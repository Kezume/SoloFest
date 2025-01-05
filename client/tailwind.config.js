/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
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
  },
  plugins: [],
};
