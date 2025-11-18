const db = require('../models/db');

exports.addInteraction = (req, res) => {
  const { profile_id, type, notes } = req.body;
  db.query(
    'INSERT INTO interactions (profile_id, type, notes) VALUES (?, ?, ?)',
    [profile_id, type, notes],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Interaction added', id: result.insertId });
    }
  );
};

exports.listInteractions = (req, res) => {
  const { profile_id } = req.params;
  db.query('SELECT * FROM interactions WHERE profile_id = ?', [profile_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
