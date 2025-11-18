const db = require('../models/db');

exports.addTransaction = (req, res) => {
  const { profile_id, type, amount } = req.body;
  db.query(
    'INSERT INTO transactions (profile_id, type, amount) VALUES (?, ?, ?)',
    [profile_id, type, amount],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Transaction recorded', id: result.insertId });
    }
  );
};

exports.listTransactions = (req, res) => {
  const { profile_id } = req.params;
  db.query('SELECT * FROM transactions WHERE profile_id = ?', [profile_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
