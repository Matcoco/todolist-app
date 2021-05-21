const express = require('express');
const router = express.Router();

const signupCtrl = require('../controllers/signupCtrl');

router.post('/', signupCtrl.postSignup);

module.exports = router;