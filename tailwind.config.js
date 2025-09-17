/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        parchment: "#E7D9C6",
        parchmentDeep: "#CBBCA7",
        river: "#5C7D8A",
        moss: "#6B7A49",
        reed: "#7A5C42",
        gold: "#C6A866",
        ink: "#1E1B18"
      },
      boxShadow: {
        // soft, earthy shadow (use shadow-ink/10 with bg-parchment/5 on cards)
        paper: "0 2px 10px rgba(30,27,24,0.12)",
      },
      borderRadius: {
        xl2: "1rem", // optional: a touch larger than rounded-xl
      }
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
