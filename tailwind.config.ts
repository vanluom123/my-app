import type { Config } from "tailwindcss";

export default {
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
        primary: "var(--primary)",
        'primary-light': "var(--primary-light)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        'text-light': "var(--text-light)"
      },
    },
  },
  plugins: [],
} satisfies Config;
