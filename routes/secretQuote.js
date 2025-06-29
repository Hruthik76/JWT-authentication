const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');

router.get('/', authenticateToken, (req, res) => {
  res.json({ quote: 'The secret to getting ahead is getting started.' });
});

module.exports = router;
