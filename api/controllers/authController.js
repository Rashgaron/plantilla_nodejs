const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');

class authController {
    register = (req, res) => {
        try {
            var { email, password, name } = req.body;
            email = email.ToLower();
            crypto.randomBytes(16, (err, salt) => {
                const newSalt = salt.toString('base64');
                crypto.pbkdf2(password, newSalt, 10000, 64, 'sha1', (err, key) => {
                    const encryptedPassword = key.toString('base64');
                    Users.findOne({ email }).exec()
                        .then(user => {
                            if(user){
                                return res.status(500).send({Error: 'User already exists'});
                            }
                            const newUser = Users.create({ 
                                email, 
                                name,
                                password: encryptedPassword, 
                                salt: newSalt 
                            })
                            console.log("hello");
                            const token = signToken(newUser._id);
                            return res.status(200).send({ token });
                        })
                })
            })   
        } catch (error) {
          return res.status(500).send({msg: error})  
        }
        
    }

    login = (req, res) => {
        try {
            var { email, password } = req.body;
            email = email.ToLower();
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
        } catch (error) {
           return res.status(500).send({msg: error}) 
        }
        
    }

}

const signToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET_WORD, {
        expiresIn: '100d'
    })
}

module.exports = authController;