const express = require('express');
const router = express.Router();

const signinCtrl = require('../controllers/signinCtrl');

router.post('/', signinCtrl.postSignin);

module.exports = router;