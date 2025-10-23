import users from '../users.json' with { type: 'json' };

export const userController = {

    getAll: (req, res, next) => {
        res.status(200).json(users);
    },

    getOneById: (req, res, next) => {
        // El id de usuario lo tengo disponible en req.params.id
        // Filtro todos los usuarios
        const id = Number.parseInt(req.params.id);

        if( isNaN(id) ) {
            return next();
        }

        // TODO: Esperamos un objeto, no un array de un elemento
        //! Tiene sentido devolver un 200 sin contenido cuando no encuentra el usuario?

        const userFind = users.find( u => u.id === id );

        // Validarlo
        if( !userFind ) {
            // return res.status(404).json({
            //     error: 'User not found',
            // });
            return next();
        }

        res.status(200).json(
            userFind
        );
    }
}