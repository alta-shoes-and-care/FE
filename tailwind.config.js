module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#175C8C",
        secondary: "#FFFFFF",
      },

      fontFamily: {
        poppins: ["Poppins"],
      },

      backgroundImage: {
        'bg-vvm': "url('../assets/vvm.png')",
      },
    },
  },
  plugins: [],
};
