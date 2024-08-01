let todos = [];

const getTodos = (req, res) => {
    res.send(todos);
};

const getTodoById = (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('The to-do item was not found.');
    res.send(todo);
};

const addTodo = (req, res) => {
    const todo = {
        id: todos.length + 1,
        title: req.body.title,
        description: req.body.description
    };
    todos.push(todo);
    res.send(todo);
};

const updateTodo = (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('The to-do item was not found.');

    todo.title = req.body.title;
    todo.description = req.body.description;
    res.send(todo);
};

const deleteTodo = (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('The to-do item was not found.');

    todos = todos.filter(t => t.id !== parseInt(req.params.id));
    res.send(todo);
};

module.exports = {
    getTodos,
    getTodoById,
    addTodo,
    updateTodo,
    deleteTodo
};
