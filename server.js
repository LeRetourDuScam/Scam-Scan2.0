const express = require('express');
const cors = require('cors');
const mongoose = require('./config/database');
const mangaRoutes = require('./routes/mangaRoutes'); // Importer les routes

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Utiliser les routes
app.use('/api/mangas', mangaRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
