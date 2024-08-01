const express = require('express');
const router = express.Router();
const Joi = require('joi');

let todos = [];

// Validation schema
const todoSchema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(5).required()
});

// Middleware for validation
const validateTodo = (req, res, next) => {
    const { error } = todoSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
};

// GET /todos: Fetch all to-do items
router.get('/todos', (req, res) => {
    res.send(todos);
});

// GET /todos/:id: Fetch one to-do item with this id
router.get('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('The to-do item was not found.');
    res.send(todo);
});

// POST /todos: Add a new to-do item
router.post('/todos', validateTodo, (req, res) => {
    const todo = {
        id: todos.length + 1,
        title: req.body.title,
        description: req.body.description
    };
    todos.push(todo);
    res.send(todo);
});

// PUT /todos/:id: Update an existing to-do item
router.put('/todos/:id', validateTodo, (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('The to-do item was not found.');

    todo.title = req.body.title;
    todo.description = req.body.description;
    res.send(todo);
});

// DELETE /todos/:id: Delete a to-do item
router.delete('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('The to-do item was not found.');

    todos = todos.filter(t => t.id !== parseInt(req.params.id));
    res.send(todo);
});

module.exports = router;
