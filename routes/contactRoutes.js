// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactControler');

router.post('/', contactController.sendContactEmail);

module.exports = router;
