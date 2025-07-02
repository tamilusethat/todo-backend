const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// GET all todos
router.get('/', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

// POST new todo with dueDate
router.post('/', async (req, res) => {
    const { text, dueDate } = req.body;
    const newTodo = new Todo({ text, dueDate });
    await newTodo.save();
    res.json(newTodo);
});

// PUT toggle complete
router.put('/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
});

// DELETE todo
router.delete('/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
});

module.exports = router;
