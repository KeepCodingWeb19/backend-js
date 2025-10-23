export function serverErrorHandler(error, req, res, next) {
    console.error("[ERROR]", error.message);
    console.error(error.stack);
    res.status(500).render(
        'error.html',
        {
            title: 'Internal Server Error',
            message: 'Ha ocurrido un error inesperado :( intentalo de nuevo más tarde.'
        }
    );
};

export function notFoundErrorHandler(req, res, next) {
    res.status(404).render(
        'error.html',
        {
            title: 'Resource Not Found',
            message: 'La ruta solicitada no se encuentra.'
        }
    );
}