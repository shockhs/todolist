const jwt = require('jsonwebtoken')


module.exports = function auth(req, res, next) {
    // CHECK TOKEN EXIST
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access denied')

    // CHECK VALID TOKEN
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    } catch (err) {
        res.status(400).send('Invalid token')
    }
}