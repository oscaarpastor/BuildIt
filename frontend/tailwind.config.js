/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          primary: "#3B82F6",        // Azul principal
          primaryHover: "#60A5FA",   // Hover del botón
          background: "#0F172A",     // Fondo general
          surface: "#334155",        // Paneles y tarjetas
          text: "#CBD5E1",           // Texto principal claro
        },
      },
    },
    plugins: [],
  };
  