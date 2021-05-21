const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const todoCtrl = require('../controllers/todoCtrl');


router.get('/:id_user', auth, todoCtrl.getAllTodos);
router.get('/:id', auth, todoCtrl.getOneTodo);
router.post('/', auth, todoCtrl.postTodo);
router.delete('/:id', auth, todoCtrl.deleteOneTodo);

module.exports = router;