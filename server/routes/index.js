const express = require('express');
const router = express.Router();
router.use('/api/auth', require('./authRoutes'));
router.use('/api/items', require('./itemRoutes'));

module.exports = router;