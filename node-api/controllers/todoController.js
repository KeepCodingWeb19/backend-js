import { validationResult, matchedData } from 'express-validator';

import { todos } from '../data/Todos.js';

export const todoController = {

    getAll: (req, res) => {

        let retTodos = todos;

        // Express - validator resut
        const result = validationResult(req);
        const data = matchedData(req);

        console.log({ result, data });

        if ( !result.isEmpty() ) {
            return res.status(400).json({
                errors: result.errors
            });
        }

        if ( data.completed !== undefined ) {
            retTodos = retTodos.filter( i => i.completed === data.completed );
        }

        if ( data.userId ) {
            retTodos = retTodos.filter( i => i.userId === userId );
        }

        if ( data.limit || data.skip ) {
            const limit = data.limit;
            const skip = data.skip || 0;
            retTodos = retTodos.slice(skip, isNaN(limit) ? undefined : limit + skip );
        }

        res.status(200).json(retTodos);
    },

    getOneById: (req, res, next) => {

        const result = validationResult(req);
        const data = matchedData(req);
        console.log({result, data});

        if ( result.errors.length > 0 ) {
            return res.status(400).json({
                errors: result.errors
            });
        }

        const todoFind = todos.find( i => i.id === data.id );

        if ( !todoFind ) {
            return next();
        }

        res.status(200).json(todoFind);

    },

    add: (req, res, next) => {

        const lastId = todos.sort((a, b) => b.id - a.id )[0].id;
        const nextId = lastId + 1;

        if ( !req.body.todo || !req.body.userId ) {
            return res.status(400).json({
                error: 'UserId and todo values are required',
            });
        }

        const newTodo = {
            id: nextId,
            todo: req.body.todo,
            completed: req.body.completed || false,
            userId: req.body.userId
        };

        todos.push(newTodo);

        res.status(201).json(
            newTodo
        );

    },

    update: (req, res, next) => {

        const id = parseInt(req.params.id);

        const findTodoIdx = todos.findIndex( i => i.id === id );

        if ( findTodoIdx === -1 ) {
            return next();
        }

        const updatedTodo = {
            id: todos[findTodoIdx].id,
            todo: req.body.todo,
            completed: req.body.completed || false,
            userId: req.body.userId
        };

        todos[findTodoIdx] = updatedTodo;

        res.status(200).json(updatedTodo);

    },

    remove: (req, res, next) => {

        const id = parseInt(req.params.id);

        const findTodoIdx = todos.findIndex( i => i.id === id );

        if ( findTodoIdx === -1 ) {
            return next();
        }

        todos.splice(findTodoIdx, 1);

        res.status(200).end();

    }
};