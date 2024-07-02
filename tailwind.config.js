/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*/.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements-react/js/**/*.js",
  ],
  theme: {
    darkMode: "class",
    colors: {
      clr_primary: "var(--color-primary)",
      clr_secondary: "var(--color-secondary)",
      clr_accent: "var(--color-accent)",
      text: "var(--color-text)",
      text_secondary: "var(--color-text-secondary)",
      background: "var(--color-background)",
      background2: "var(--color-background2)",
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
    }
  },
  plugins: [],
}