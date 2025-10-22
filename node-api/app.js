import express from 'express';
import morgan from 'morgan';

// Middlewares
import { filterAdminPath, filterFirefox } from './lib/middlewares/authMiddleware.js';
import { serverErrorHandler, notFoundErrorHandler } from './lib/middlewares/errorMiddleware.js';

// Routes
import { router } from './routes/webRoutes.js';

const app = express();

// 3rd Party Middlewares
app.use(morgan('dev'));

/**
 * Middlewares
 ********/

app.use((req, res, next) => {
    // Si algún middlewere no llama a next() la petición se queda congelada.
    // console.log("Soy un middlewere");
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

/**
 * Filter middlewares
 */
app.use(filterAdminPath);
app.use(filterFirefox);



/**
 * Routes
 ********/
app.use('/', router);


/**
 * Error Handlers
 ********/
// app.get('/', (req, res, next) => {
//     throw new Error("Fatal Error");
//     // res.send('Hello world!!!');
// });
app.use(serverErrorHandler);
// 404 Error Handler
// Este debe ser el último middleware
app.use(notFoundErrorHandler);


export default app;