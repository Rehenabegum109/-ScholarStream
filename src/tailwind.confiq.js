module.exports = {
  darkMode: "class", 
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        scholarship: {
          primary: "#2563eb",
          secondary: "#16a34a",
          accent: "#38bdf8",
          neutral: "#0f172a",

          "base-100": "#ffffff",
          "base-200": "#f8fafc",
          "base-300": "#e5e7eb",

          info: "#0ea5e9",
          success: "#22c55e",
          warning: "#f59e0b",
          error: "#ef4444",
        },
      },
    ],
  },
};
