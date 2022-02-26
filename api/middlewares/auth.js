const jwt = require('jsonwebtoken');
const { Users } = require('../models');

module.exports = (req, res, next) => {
    var token = req.headers.authorization;
    if (!token) {
        return res.sendStatus(403);
    }
    token = token.replace('Bearer ', '');
    jwt.verify(token, process.env.SECRET_WORD, (err, decoded) => {
        const { _id } = decoded;
        Users.findOne({ _id }).exec()
            .then(user => {
                if(!user){
                    return res.status(403).send('You are not authorized');
                }
                req.user = user;
                next();
            });
    });
}