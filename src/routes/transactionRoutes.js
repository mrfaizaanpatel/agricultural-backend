const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, transactionController.addTransaction);
router.get('/:profile_id', authenticateToken, transactionController.listTransactions);

module.exports = router;
