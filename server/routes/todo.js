const router = require('express').Router()
const Todo = require('../models/Todo')
const verify = require('./verifyToken')
const Task = require('../models/Task')
const User = require('../models/User')


router.post('/', verify, async (req, res) => {
    // CHECK EXIST USER
    const userExist = await User.findOne({ name: req.body.userLogin })
    if (!userExist) return res.status(400).send({ error: `User with login:${req.body.userLogin} doesn't exist`, resultCode: 10 });

    const todo = new Todo({
        title: req.body.title,
        authorId: userExist._id
    });

    try {
        const savedTodo = await todo.save();
        res.send({ _id: savedTodo._id, title: savedTodo.title, date: savedTodo.date, authorId: savedTodo.authorId })
    } catch (err) {
        res.status(400).send(err);
    }
})

router.post('/task', verify, async (req, res) => {
    // CHECK EXIST USER
    const todoExist = await Todo.findOne({ _id: req.body.todoId })
    if (!todoExist) return res.status(400).send({ error: `Todo with id: ${req.body.todoId} doesn't exist`, resultCode: 10 });

    const task = new Task({
        todoId: req.body.todoId,
        task: req.body.task
    });

    try {
        const savedTask = await task.save();
        res.send({ _id: savedTask._id, todoId: savedTask.todoId, task: savedTask.task, date: savedTask.date })
    } catch (err) {
        res.status(400).send(err);
    }
})
router.get('/userLogin=?:userLogin', verify, async (req, res) => {
    // FIND ID BY USERLOGIN
    const author = await User.findOne({ name: req.params.userLogin })

    // CHECK EXIST USER
    const todoExist = await Todo.find({ authorId: author._id })
    if (!todoExist) return res.status(400).send({ error: `Todo with id: ${req.params.authorId} doesn't exist`, resultCode: 10 });

    try {
        res.send(todoExist)
    } catch (err) {
        res.status(400).send(err);
    }
})
router.get('/task=?:todoId', verify, async (req, res) => {
    // FIND ID BY TODO NAME
    const todoExist = await Todo.findOne({ _id: req.params.todoId })
    if (!todoExist) return res.status(400).send({ error: `Todo with id: ${req.params.todoId} doesn't exist`, resultCode: 10 });
    // CHECK EXIST TASKS
    const taskExist = await Task.find({ todoId: todoExist._id })
    if (!taskExist) return res.status(400).send({ error: `Tasks in this Todo doesn't exist`, resultCode: 10 });

    try {
        res.send(taskExist)
    } catch (err) {
        res.status(400).send(err);
    }
})
router.delete('/', verify, async (req, res) => {
    // FIND ID BY TODOID
    const todoExist = await Todo.findOne({ _id: req.body.todoId })
    if (!todoExist) return res.status(400).send({ error: `Todo with id: ${req.body.todoId} doesn't exist`, resultCode: 10 });

    try {
        await todoExist.remove();
        res.send({ message: `Todo with id: ${req.body.todoId} deleted` })
    } catch (err) {
        res.status(400).send(err);
    }
})
router.delete('/task', verify, async (req, res) => {
    // FIND TODO BY ID
    const todoExist = await Todo.findOne({ _id: req.body.todoId })
    if (!todoExist) return res.status(400).send({ error: `Todo with id: ${req.body.todoId} doesn't exist`, resultCode: 10 });

    // FIND TASK BY ID
    const taskExist = await Task.findOne({ _id: req.body.taskId, todoId: todoExist._id })
    if (!taskExist) return res.status(400).send({ error: `Task with id: ${req.body.taskId} doesn't exist`, resultCode: 10 });

    try {
        await taskExist.remove();
        res.send({ message: `Task with id: ${req.body.taskId} deleted` })
    } catch (err) {
        res.status(400).send(err);
    }
})


module.exports = router;