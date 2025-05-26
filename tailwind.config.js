/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./dist/**/*.{js,jsx,ts,tsx}"],
  prefix: "grid-tool-", // Prefix all classes to avoid conflicts
  important: true, // Make our styles take precedence
  corePlugins: {
    preflight: false, // Disable Tailwind's base styles to avoid conflicts
  },
  theme: {
    extend: {
      colors: {
        // Add your custom colors here
      },
      spacing: {
        // Add your custom spacing here
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
