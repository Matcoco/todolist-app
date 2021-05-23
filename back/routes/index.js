const express = require("express");
const router = express.Router();
const todos = require('./todo');
const signup = require('./signup');
const signin = require('./signin');
const user = require('./user');

router.use('/todos', todos);
router.use('/users', user);
router.use('/signup', signup);
router.use('/signin', signin);


module.exports = router;