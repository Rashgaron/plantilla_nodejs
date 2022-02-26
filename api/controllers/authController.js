const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');

class authController {
    register = (req, res) => {
        const { email, password, name } = req.body;
        crypto.randomBytes(16, (err, salt) => {
            const newSalt = salt.toString('base64');
            crypto.pbkdf2(password, newSalt, 10000, 64, 'sha1', (err, key) => {
                const encryptedPassword = key.toString('base64');
                Users.findOne({ email }).exec()
                    .then(user => {
                        if(user){
                            return res.send('user already exists');
                        }
                        Users.create({ 
                            email, 
                            name,
                            password: encryptedPassword, 
                            salt: newSalt 
                        })
                        return res.send(200);
                    })
            })
        })
    }

    login = (req, res) => {
        const { email, password } = req.body;
        Users.findOne({ email }).exec()
            .then(user => {
                if(!user){
                    return res.send('Error with password or email');
                }
                crypto.pbkdf2(password, user.salt, 10000, 64, 'sha1', (err, key) => {
                    const encryptedPassword = key.toString('base64');
                    if(encryptedPassword !== user.password) {
                        return res.send('Error with password or email');
                    }
                    const token = signToken(user._id);
                    return res.send({ token });
                })
            })
    }

}

const signToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET_WORD, {
        expiresIn: '100d'
    })
}

module.exports = authController;