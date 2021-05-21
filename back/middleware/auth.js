const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try {
        const headers_auth = req.headers.authorization;
        const token = headers_auth ? headers_auth.split(" ")[1] : null;
        if(token){
            next();
        }else{
            throw `Vous n'êtes pas autorisé à réaliser cette action`
        }

    } catch (error) {
        res.status(401).json({ error : error});
    }
}