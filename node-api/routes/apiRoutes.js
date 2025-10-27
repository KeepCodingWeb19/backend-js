import express from 'express';

// Controllers
import { healthCall } from '../controllers/healthController.js';
import { getDemo, getDownload, getEnd, getFile, getOneParamOptional, getRedirect, getTwoParams } from '../controllers/demoController.js';
import { userController } from '../controllers/userController.js';
import { todoController } from '../controllers/todoController.js';

export const router = express.Router();

// Health endpoint
router.get(['/health', '/ping'], healthCall);

// Demo & Params
router.get('/demo', getDemo);
router.get('/download', getDownload);
router.get('/file', getFile);
router.get('/redirect', getRedirect);
router.get('/end', getEnd);
// router.get('/params/:id', getOneParam);
router.get('/params/{:id}', getOneParamOptional);
router.get('/params/:company/:username', getTwoParams);

// Users
// /api/users -> Devuelve todos los usuarios
router.get('/users', userController.getAll);
// Como hacemos para tener un unico usuario?
router.get('/users/:id', userController.getOneById);
router.post('/users', userController.add);

// Todos
router.get('/todos', todoController.getAll);
router.get('/todos/:id', todoController.getOneById);
router.post('/todos/', todoController.add);