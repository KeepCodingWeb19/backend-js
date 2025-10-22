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
    // console.log({
    //     headers: req.headers,
    //     host: req.host,
    //     url: req.url,
    //     method: req.method,
    //     ip: req.ip,
    // })
    next();
});

// TODO: Filtrar todas las peticiones a /admin -> 403
app.use((req, res, next) => {
    if (req.url.startsWith('/admin')) {
        return res.status(403).send("Forbidden Access to /admin path");
    }
    next();
});

// TODO: Rechaza todas las peticiones que vengan desde un navegador Firefox
app.use((req, res, next) => {
    // Forbidden for firefox users
    if (
        req.headers['user-agent'] && req.headers['user-agent'].includes('Firefox')
    ) {
        return res.status(403).send("Forbidden for Firefox users");
    }
    next();
});


app.get('/', (req, res, next) => {
    res.send('Hello world!!!');
});




// 404 Error Handler
// Este debe ser el último middleware
app.use((req, res, next) => {
    res.status(404).send("Route not found :(");
});

export default app;