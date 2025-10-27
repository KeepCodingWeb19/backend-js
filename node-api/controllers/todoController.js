import { todos } from '../data/Todos.js';

export const todoController = {

    getAll: (req, res) => {

        let retTodos = todos;

        if ( req.query.completed ) {
            // ?completed=true
            // ?completed=false
            // ?completed=1
            // ?completed=0
            // const completed = req.query.completed === 'true';
            const completed = 
                req.query.completed.toLowerCase() === 'true' ||
                req.query.completed === '1';
            // Cuando es false quiere los no completados o los quiere todos?
            
            retTodos = retTodos.filter(i => i.completed === completed);
        }

        if ( req.query.userId ) {
            const userId = parseInt(req.query.userId);
            if ( isNaN(userId) ) {
                // next();
                return res.status(400).json({
                    error: 'Invalid user id',
                });
            }
            retTodos = retTodos.filter( i => i.userId === userId );
        }

        if ( req.query.limit || req.query.skip ) {
            const limit = parseInt(req.query.limit);
            const skip = parseInt(req.query.skip) || 0;
            retTodos = retTodos.slice(skip, isNaN(limit) ? undefined : limit + skip );
        }

        res.status(200).json(retTodos);
    },

    getOneById: (req, res) => {

        const id = parseInt(req.params.id);

        if ( isNaN(id) ) {
            return next();
        }

        const todoFind = todos.find( i => i.id === id );

        if ( !todoFind ) {
            return next();
        }

        res.status(200).json(todoFind);
        
    }
};