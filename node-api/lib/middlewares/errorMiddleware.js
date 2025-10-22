export function serverErrorHandler(error, req, res, next) {
    console.error("Fatal Error!!!!!: ", error.message);
    res.status(500).send("Internal Server Error");
}

export function notFoundErrorHandler(req, res, next) {
    res.status(404).send("Route not found :(");
}