const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/favoritesManga/:username', userController.getUserFavoritesManga);
router.delete('/favoritesManga/:username', userController.deleteFavoritesManga);
router.post('/favoritesManga/:username', userController.addFavoritesManga);

module.exports = router;
