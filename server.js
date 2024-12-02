const express = require('express');
const cors = require('cors');
const mongoose = require('./config/database');
const mangaRoutes = require('./routes/mangaRoutes'); // Importer les routes
const contactRoutes = require('./routes/contactRoutes');
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');
const viewRoutes = require('./routes/viewsRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Utiliser les routes
app.use('/api/mangas', mangaRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/user',userRoutes);
app.use('/api/comment',commentRoutes);
app.use('/api/view', viewRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
