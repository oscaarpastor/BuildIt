/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          primary: "#3B82F6",        
          primaryHover: "#60A5FA",   
          background: "#0F172A",     
          surface: "#334155",        
          text: "#CBD5E1",           
        },
      },
    },
    plugins: [],
  };
  