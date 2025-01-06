const mongoose = require('mongoose');

const conLink = 'mongodb://localhost:27017/Manga';
mongoose.connect(conLink)
    .then(() => console.log("MongoDB connecté à la base de données Manga"))
    .catch((err) => console.error("Erreur de connexion à MongoDB :", err));

module.exports = mongoose;