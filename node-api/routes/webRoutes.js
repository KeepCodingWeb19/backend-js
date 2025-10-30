import express from 'express';
import { loginController } from '../controllers/loginController.js';

export const router = express.Router();

router.get('/welcome', (req, res, next) => {
    res.status(200).send(`
        <h1>Bienvenido a nuestro servidor</h1>
        <p>Este servidor esta escrito con node.js</p>
    `);
});

router.get('/about', (req, res, next) => {
    res.status(200).send("Esta es la página acerca de KeepCoding");
});

router.get('/', (req, res, next) => {
    // const env = process.env.NODE_ENV;
    const now = (new Date()).toLocaleString();
    const lang = process.env.LANG;
    // console.table(req.headers);
    // res.status(200).send(`
    //     <h1>Server Node.js</h1>
    //     <p>Author: KeepCoding Web Bootcamp XIX</p>
    //     <p>Environment: ${env} | Date: ${now}</p>
    //     <p>Lang: ${lang}</p>
    // `);
    res.render('home.html', {
        title: 'KeeepCoding Web Bootcamp XIX',
        message: 'We\'re Coming Soon...',
    });
});

router.get('/comming-son', (req, res, next) => {
    // res.status(200).send(`
    //     <h1>Coming Son</h1>
    //     <p>Este servidor estará disponible proximamente</p>
    // `);
    res.render('home.html', {
        title: 'KeeepCoding Web Bootcamp XIX',
        message: 'We\'re Coming Soon...',
    });
});

router.get('/login', loginController.index);
router.post('/login', loginController.postLogin);

