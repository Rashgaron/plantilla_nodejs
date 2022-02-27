const { Posts, Users } = require('../models');

class postController {
    constructor ( loggerService ) {
        this.loggerService = loggerService;
    }

    getAll = async (req, res) => {
        try {
            const posts = await Posts.find();
            res.status(200).send(posts);
            this.loggerService.log(`Data: ${posts}`);   
        } catch (error) {
            this.loggerService.log(`Data: ${error}`);    
            res.status(500).send(error);
        }
    }

    getAllFromUser = async (req, res) => {
        try {
            const posts = await Posts.find({ user: req.query.userId });
            res.status(200).send(posts);
            this.loggerService.log(`Data: ${posts}`);           
        } catch (error) {
           this.loggerService.log(`Data: ${error}`);
           res.status(500).send(error);
        }
    }

    getPost = async (req, res) => {
        try {
            const post = await Posts.findById(req.params.id);
            res.status(200).send(posts);
            this.loggerService.log(`Data: ${post}`);           
        } catch (error) {
           this.loggerService.log(`Error: ${error}`); 
            res.status(500).send(error);
        }

    }

    create = async (req, res) => {
        try {
            const post = await Posts.create(req.body);
            const user = await Users.findById(req.body.user);
            await user.addPost(post);
            console.log(user);
            res.status(200).send(post);
            this.loggerService.log(`Data: ${post}`);
        } catch (error) {
            this.loggerService.log(`Error: ${error}`);    
            res.status(500).send(error);
        }
    }

}

module.exports = postController;