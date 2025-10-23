import express from 'express';
import path from 'path';

import packageJson from '../package.json' with { type: 'json' };

export const router = express.Router();

// Health endpoint
router.get(['/health', '/ping'], (req, res, next) => {
    // TODO: me gustaria informar
    const uptime = process.uptime();

    // - cuanto tiempo lleva mi proceso activo?
    // - que versión de mi aplicación estoy corriendo?
    res.status(200).json({
        status: 'Server Online',
        uptime: `${uptime.toFixed(2)}s`,
        // info: require('../package.json').version // CommonJS es valido
        version: packageJson.version,
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

// router.get('/params/:id', (req, res, next) => {
//     const id = req.params.id;
//     console.log(id);
//     res.status(200).json({ id })
// });

router.get('/params/{:id}', (req, res, next) => {
    const id = req.params.id;
    console.log('params', id);
    res.status(200).json({
        status: 200,
        params: req.params.id || null,
    })
});

router.get('/params/paginated', (req, res, next) => {
    res.status(200).json({
        data: "Endpoint paginated"
    })
})

router.get('/params/:company/:username', (req, res, next) => {
    console.table(req.params);
    res.status(200).json(req.params);
})

