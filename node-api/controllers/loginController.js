
export const loginController = {

    index: (req, res, next) => {
        res.render('login.html');
    },

    postLogin: (req, res, next) => {
        console.log(req.body);
        // TODO: Busca si el usuario existe y el password es correcto.
        res.redirect('/');
    },
};