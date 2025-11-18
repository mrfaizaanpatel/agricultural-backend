const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.get('/:id', authenticateToken, profileController.getProfileById);
router.get('/', authenticateToken, profileController.listProfiles);

module.exports = router;
