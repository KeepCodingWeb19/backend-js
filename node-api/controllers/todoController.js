import { todos } from '../data/Todos.js';

export const todoController = {

    getAll: (req, res) => {

        let retTodos = todos;

        if ( req.query.limit || req.query.skip ) {
            const limit = parseInt(req.query.limit);
            const skip = parseInt(req.query.skip) || 0;
            retTodos = retTodos.slice(skip, isNaN(limit) ? undefined : limit + skip );
        }

        res.status(200).json(retTodos);
    },
};