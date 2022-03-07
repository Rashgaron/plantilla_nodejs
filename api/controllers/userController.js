const { Users } = require('../models');

class userController {
    constructor( loggerService ) {
        this.loggerService = loggerService;
    }

    getAll = async (req, res) => {
        const users = await Users.find(); 
        res.status(200).send(users);
    }

    getById = async (req, res) => {
        const user = await Users.findById(req.params.id);
        res.status(200).send(user);
    }
    create = async (req, res) => {
        try {
            const user = await Users.create(req.body); 
            res.status(201).send(user);           
        } catch (error) {
           res.status(500).send(error); 
        }
    }
    update = async (req, res) => {
        const user = await Users.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send(user);
    }
    delete = async (req, res) => {
        const user = await Users.findByIdAndDelete(req.user._id);
        res.status(200).send("User deleted");
    }
}

module.exports = userController;