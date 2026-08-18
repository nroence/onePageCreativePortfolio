import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#343434",
        canvas: "#DFDFDF",
        blue: "#0E34A0",
        navy: "#2F3061",
        line: "#5F5980",
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"],
        garamond: ["Garamond", "Apple Garamond", "Baskerville", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
