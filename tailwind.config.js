export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.js",
  ],

  theme: {
    extend: {
      colors: {
        // Main Brand Colors
        primary: "#ef9b28",
        secondary: "#315951E5",

        // Status Colors
        success: "#198754",
        danger: "#DC3545",
        warning: "#FFC107",
        info: "#0DCAF0",

        // Neutral Colors
        dark: "#212529",
        gray: "#6C757D",
        light: "#F8F9FA",
        white: "#FFFFFF",

        // Backgrounds
        background: "#F5F5F5",
        surface: "#FFFFFF",
      },
    },
  },

  plugins: [require("flowbite/plugin")],
};