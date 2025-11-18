const db = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.addProfile = async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      'INSERT INTO profiles (name, email, phone, password) VALUES (?, ?, ?, ?)',
      [name, email, phone, hashedPassword],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Profile created', id: result.insertId });
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProfileById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT id, name, email, phone FROM profiles WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Profile not found' });
    res.json(results[0]);
  });
};

exports.listProfiles = (req, res) => {
  let { page, limit } = req.query;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  const offset = (page - 1) * limit;

  db.query(
    'SELECT id, name, email, phone FROM profiles LIMIT ? OFFSET ?',
    [limit, offset],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ page, limit, data: results });
    }
  );
};
