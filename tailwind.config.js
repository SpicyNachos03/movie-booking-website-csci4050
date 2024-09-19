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

        // Custom colors
        lightCyan: "#B9D2D2",
        sageGreen: "#62A388",
        tealBlue: "#055E68",
        charcoal: "#343434",
      },
    },
  },
  plugins: [],
};
