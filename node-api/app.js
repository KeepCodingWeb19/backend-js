import express from 'express';

const app = express();

app.use((req, res, next) => {
    // Si algún middlewere no llama a next() la petición se queda congelada.
    console.log("Soy un middlewere");
    // res.send("Hola mundo");
    next();
});

app.use((req, res, next) => {
    // res.status(403).send("Access forbidden");
    next();
});


app.use((req, res, next) => {
    // console.log(req);
    console.log({
        headers: req.headers,
        host: req.host,
        url: req.url,
        method: req.method,
        ip: req.ip,
    })
    next();
});

// TODO: Rechaza todas las peticiones que vengan desde un navegador Firefox


app.get('/', (req, res, next) => {
    res.send('Hello world!!!');
});

export default app;