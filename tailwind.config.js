/** @type {import('tailwindcss').Config} */
export default {
  important: "#root",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#B47150",
        secondary: "#E8E5E4",
        background: "#FBFBFB",
        text: "#1E1A1D",
      },
      backgroundImage: {
        hero: "url('./src/assets/hero-mobile.webp')",
      },
    },
  },
  plugins: [],
};

// import as from "./src/assets/hero-img.webp";
