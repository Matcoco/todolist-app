const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const userCtrl = require('../controllers/userCtrl');

router.get('/:email', auth, userCtrl.getCurrentUser);

module.exports = router;