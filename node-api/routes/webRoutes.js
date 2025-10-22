import express from 'express';

export const router = express.Router();

router.get('/welcome', (req, res, next) => {
    res.status(200).send("Bienvenido a nuestro servidor desde welcome");
});

router.get('/about', (req, res, next) => {
    res.status(200).send("Esta es la página acerca de KeepCoding");
});

router.get('/', (req, res, next) => {
    res.status(200).send("Bienvenido a nuestro servidor!!");
});

