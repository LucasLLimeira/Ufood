/** @type {import('tailwindcss').Config} */
module.exports = {
  // Analisa apenas os arquivos deste micro para gerar somente as classes usadas
  content: ['./src/**/*.{js,jsx}', './public/index.html'],
  theme: {
    extend: {
      // Paleta de marca UFood — vermelho pizzaria
      colors: {
        brand: {
          50: '#fff1f1',
          100: '#ffdada',
          200: '#ffb3b3',
          500: '#e63b2e',
          600: '#c72c20',
          700: '#a82318',
        },
      },
    },
  },
  plugins: [],
};
