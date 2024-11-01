const express = require('express');
const router = express.Router();
const mangaController = require('../controllers/mangaController');

// Routes CRUD
router.post('/', mangaController.createManga);
router.get('/', mangaController.getMangas);
router.get('/slug/:slug', mangaController.getMangaBySlug);
router.put('/slug/:slug', mangaController.updateMangaBySlug);
router.delete('/slug/:slug', mangaController.deleteMangaBySlug);

module.exports = router;
