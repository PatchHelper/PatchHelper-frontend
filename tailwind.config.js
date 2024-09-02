/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/App.tsx",
    "./src/**/*/.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements-react/js/**/*.js",
  ],
  theme: {
    darkMode: ["class"],
    colors: {
      clr_primary: "var(--color-primary)",
      clr_secondary: "var(--color-secondary)",
      clr_accent: "var(--color-accent)",
      text: "var(--color-text)",
      text_secondary: "var(--color-text-secondary)",
      background: "var(--color-background)",
      background2: "var(--color-background2)",
      danger: "var(--color-danger)",
      transparent: 'transparent',
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      inter: ["Inter", "sans-serif"],
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      keyframes: {
        "wave-right": {
          "0%": { "background-position-x": "0px" },
          "100%": { "background-position-x": "1440px" },
        },
        "wave-left": {
          "0%": { "background-position-x": "1440px" },
          "100%": { "background-position-x": "0px" },
        },
        "wave": {
          "0%": {transform: "translateY(0)"},
          "50%": {transform: "translateY(-20px)"},
          "100%": {transform: "translateY(0)"},
        }
      },
      animation: {
        "wave1": "wave-right 35s linear infinite",
        "wave2": "wave-left 20s linear infinite",
        "waveUpDown": "wave 10s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}