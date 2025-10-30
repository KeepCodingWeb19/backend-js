
// Filtrar todas las peticiones a /admin -> 403
export function filterAdminPath(req, res, next) {
    if (req.url.startsWith('/admin')) {
        return res.status(403).send("Forbidden Access to /admin path");
    }
    next();
};

// Rechaza todas las peticiones que vengan desde un navegador Firefox
export function filterFirefox(req, res, next) {
    // Forbidden for firefox users
    if (
        req.headers['user-agent'] && req.headers['user-agent'].includes('Firefox')
    ) {
        return res.status(403).send("Forbidden for Firefox users");
    }
    next();
}

export function guard(req, res, next) {
    const redirect = req.url;
    // Si no tenemos sesión, al login
    return res.redirect(`/login?redir=${redirect}`);
}