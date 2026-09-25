require("dotenv").config();
const express = require("express");

const app = express();


app.use(express.json()); //body parsing middleware

let todos = [
    { id: 1, task: 'Learn node.js', completed: false},
    { id: 2, task: 'Build CRUD_API', completed: false},
];

app.get("/todos", (req, res) => {
    res.status(200).json(todos);
});
app.post("/todos", (req, res) => {
    const {task} = req.body;
    if (!task) {
        return res.status(400).json({ message:"Task is required"});
    }
    const newTodo = {
        id: todos.length + 1,
        task: task,
        completed: false,
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});
app.get("/todos/active", (req, res) => {
    const activeTodos = todos.filter(todo => todo.completed === false);

    res.status(200).json(activeTodos);
});
app.get("/todos/:id", (req, res) => {
    const id = Number(req.params.id);

    const todo = todos.find(todo => todo.id === id);

    if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json(todo);
});
app.put("/todos/:id", (req, res) => {
    const id = Number(req.params.id);

    const todo = todos.find(todo => todo.id === id);

    if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
    }

    const { task, completed } = req.body;

    if (task !== undefined) {
        todo.task = task;
    }

    if (completed !== undefined) {
        todo.completed = completed;
    }

    res.status(200).json(todo);
});
    

app.delete("/todos/:id", (req, res) => {
    const id = Number(req.params.id);

    const todoIndex = todos.findIndex(todo => todo.id === id);

    if (todoIndex === -1) {
        return res.status(404).json({ message: "Todo not found" });
    }

    const deletedTodo = todos.splice(todoIndex, 1);

    res.status(200).json(deletedTodo[0]);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});