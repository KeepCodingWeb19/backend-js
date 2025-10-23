import express from 'express';
import path from 'path';

export const router = express.Router();

// Health endpoint
router.get(['/health', '/ping'], (req, res, next) => {
    res.status(200).json({
        status: 'Server Online'
    });
});

router.get('/demo', (req, res, next) => {
    //res.status(200).send({ foo: 'bar', }); // Envia Content-Type: application/json
    // res.status(200).send(new Buffer('Wooop')); // Envia Content-Type: application/octet-stream
    res.status(200).send('<p>Hola</p>') // Envia Content-Type: text/html;
});

router.get('/download', (req, res, next) => {
    res.status(200).download('../doc/BackendJS.pdf', 'backend.pdf');
});

router.get('/file', (req, res, next) => {
    const dirname = import.meta.dirname; // en CommonJS es __dirname;
    // const filePath = import.meta.dirname + '../../doc/BackendJS.pdf'; No solemos hacer este tipo de joins para rutas.
    const filePath = path.join(import.meta.dirname, '../../doc/BackendJS.pdf');
    console.log(filePath);
    res.status(200).sendFile(filePath);
});

router.get('/redirect', (req, res, next) => {
    res.redirect('/api/health');
})

router.get('/end', (req, res, next) => {
    res.end();
});