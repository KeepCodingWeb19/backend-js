import { validationResult, matchedData } from 'express-validator';

import { dbClient } from '../lib/connectMongo.js';
import { todos } from '../data/Todos.js';

export const todoController = {

    getAll: async (req, res) => {

        // Express - validator resut
        const result = validationResult(req);
        const data = matchedData(req);
        const filter = {};

        if ( !result.isEmpty() ) {
            return res.status(400).json({
                errors: result.errors
            });
        }

        if ( data.completed !== undefined ) {
            filter.completed = data.completed;
            // { completed: true / false }
        }

        if ( data.userId ) {
            filter.userId = data.userId;
            // { userId: data.userId }
        }

        const dbTodos = await dbClient.db().collection('todos')
            .find(filter)
            .skip(data.skip || 0)
            .limit(data.limit || 100)
            .toArray();
        // console.log({filter, dbTodos});

        res.status(200).json(dbTodos);
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