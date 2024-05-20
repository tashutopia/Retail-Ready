import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'retailready-blue': '#56707a',
        'retailready-yellow': '#F5BF56',
      },
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'], // Ensure 'Raleway' is loaded in your project
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
