const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 

// Inscription
exports.registerUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Connexion
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Identifiants incorrects' });
        }
        const token = jwt.sign({ userId: user._id, role: user.role }, 'votre_secret_key', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserFavoritesManga = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.userId });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.json(user.favoritesManga);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.addFavoritesManga = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.query.userId });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        user.favoritesManga.push(req.body.manga);
        await user.save();
        res.status(200).json({ message: 'Manga ajouté aux favoris' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteFavoritesManga = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.userId });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        user.favoritesManga = user.favoritesManga.filter(manga => manga !== req.body.manga);
        await user.save();
        res.status(200).json({ message: 'Manga supprimé des favoris' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};