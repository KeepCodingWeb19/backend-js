
export function filterAdminPath(req, res, next) {
    if (req.url.startsWith('/admin')) {
        return res.status(403).send("Forbidden Access to /admin path");
    }
    next();
};

export function filterFirefox(req, res, next) {
    // Forbidden for firefox users
    if (
        req.headers['user-agent'] && req.headers['user-agent'].includes('Firefox')
    ) {
        return res.status(403).send("Forbidden for Firefox users");
    }
    next();
}