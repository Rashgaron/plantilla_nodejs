const { User } = require('../models');

class userController {
    constructor( loggerService ) {
        this.loggerService = loggerService;
    }

    getAll = async (req, res) => {
        const users = await User.find(); 
        res.status(200).send(users);
    }

    getById = async (req, res) => {
        const user = await User.findById(req.params.id);
        res.status(200).send(user);
    }
    create = async (req, res) => {
        const user = await User.create(req.body); 
        res.status(200).send(user);
    }
    update = async (req, res) => {
        const user = await User.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send(user);
    }
    delete = async (req, res) => {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).send("User deleted");
    }
}

module.exports = userController;