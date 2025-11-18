const db = require('../models/db');
const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

exports.uploadDocument = [
  upload.single('document'),
  (req, res) => {
    const { profile_id } = req.body;
    const file_name = req.file.filename;
    const file_path = req.file.path;

    db.query(
      'INSERT INTO documents (profile_id, file_name, file_path) VALUES (?, ?, ?)',
      [profile_id, file_name, file_path],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Document uploaded', id: result.insertId });
      }
    );
  }
];
