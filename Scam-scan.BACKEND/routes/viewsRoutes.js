const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');

router.post('/', viewController.addView);
router.get('/:Slug', viewController.getViewBySlug);

module.exports = router;
