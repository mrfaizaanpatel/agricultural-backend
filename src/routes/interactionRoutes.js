const express = require('express');
const router = express.Router();
const interactionController = require('../controllers/interactionController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, interactionController.addInteraction);
router.get('/:profile_id', authenticateToken, interactionController.listInteractions);

module.exports = router;
