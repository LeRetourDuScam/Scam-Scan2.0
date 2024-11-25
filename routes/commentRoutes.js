// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/', commentController.postComment);
router.get('/:mangaSlug', commentController.getComments);
router.post('/:commentId/reply', commentController.replyToComment);
router.post('/:commentId/:replayId/reply', commentController.replyToReply);

module.exports = router;
