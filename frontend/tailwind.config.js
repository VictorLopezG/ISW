/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '100%', // Asegura que siempre ocupe el 100% en pantallas pequeñas
        'md': '100%',
        'lg': '100%',
        'xl': '100%',
        '2xl': '100%',
      },
    },
  },
  plugins: [],
}

/*
  theme: {
    extend: {
      container: {
        center: true, // Centra el contenedor horizontalmente
        padding: '1rem', // Ajusta el padding global para el contenedor
      },
      screens: {
        'sm': '100%', // Asegura que siempre ocupe el 100% en pantallas pequeñas
        'md': '100%',
        'lg': '100%',
        'xl': '100%',
        '2xl': '100%',
      },
    },
  },
  plugins: [],
}
*/