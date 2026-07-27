/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        coral: {
          DEFAULT: "#FF6B6B",
          dark: "#e05555",
        },
        amber: {
          DEFAULT: "#FCA204",
        },
        panel: {
          DEFAULT: "#1e1e1e",
          card: "#2e2e2e",
          nested: "#404040",
        },
      },

      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        source: ["Source Code Pro", "monospace"]
      },
    },
  },
  plugins: [],
};
