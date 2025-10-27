import { todos } from '../data/Todos.js';

export const todoController = {

    getAll: (req, res) => {

        res.status(200).json(todos);
    },
};