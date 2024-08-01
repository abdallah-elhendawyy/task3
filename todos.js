const express = require('express');
const router = express.Router();
const todoController = require('./todoController');
const validateTodo = require('./validateMiddleware');

router.get('/todos', todoController.getTodos);
router.get('/todos/:id', todoController.getTodoById);
router.post('/todos', validateTodo, todoController.addTodo);
router.put('/todos/:id', validateTodo, todoController.updateTodo);
router.delete('/todos/:id', todoController.deleteTodo);

module.exports = router;

