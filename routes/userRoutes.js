const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/favoritesManga/:userId', userController.getUserFavoritesManga);
router.delete('/favoritesManga/:slug', userController.deleteFavoritesManga);
router.post('/favoritesManga', userController.addFavoritesManga);

module.exports = router;
