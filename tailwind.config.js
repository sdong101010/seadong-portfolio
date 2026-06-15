/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0a",
        paper: "#f1ead9",
        cream: "#e8dec1",
        red: {
          DEFAULT: "#e21a2a",
          deep: "#b00d1c",
          soft: "#ff3946",
        },
        // primary kept for parity with the Prisma prompt utilities (text-primary, text-primary/70)
        primary: "#f1ead9",
      },
      fontFamily: {
        display: ['"Bebas Neue"', "Impact", "sans-serif"],
        sans: ['"Oswald"', '"Helvetica Neue"', "sans-serif"],
        serif: ['"DM Serif Display"', "serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      boxShadow: {
        cut: "8px 8px 0 #0a0a0a",
        "cut-sm": "4px 4px 0 #0a0a0a",
      },
    },
  },
  plugins: [],
};
