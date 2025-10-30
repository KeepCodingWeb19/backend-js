import { User } from '../models/User.js';
import { compare } from 'bcrypt';

export const loginController = {

    index: (req, res, next) => {
        res.render('login.html');
    },

    postLogin: async (req, res, next) => {

        try {

            // Buscamos el usuario en la base de datos
            // Forzamos el select de password
            const user = await User.findOne({
                email: req.body.email,
            }).select('+password');

            // Comparar password
            if (!user || !(await user.comparePassword(req.body.password))) {
                // Usuario o password incorrecto
                return !res.render('login.html');
            }

        } catch(error) {
            next(error);
        }
        res.redirect('/');
    },
};