// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/', commentController.postComment);
router.post('/reply', commentController.postReply);
router.get('/:mangaSlug', commentController.getComments);

module.exports = router;
