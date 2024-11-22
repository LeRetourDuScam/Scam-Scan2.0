/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}" // Ajoutez les fichiers SCSS
  ],
  darkMode: "class",
  theme: {
    extend: {}, // Personnalisation des thèmes si nécessaire
  },
  plugins: [], // Ajoutez des plugins Tailwind ici si besoin
};
