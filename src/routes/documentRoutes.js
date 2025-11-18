const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, documentController.uploadDocument);

module.exports = router;
