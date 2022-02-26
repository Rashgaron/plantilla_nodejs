const { Post } = require('../models');

class postController {
    constructor ( loggerService ) {
        this.loggerService = loggerService;
    }

    getAll = async (req, res) => {
        try {
            const posts = await Post.find();
            res.status(200).send(posts);
            this.loggerService.log(`Data: ${posts}`);   
        } catch (error) {
            this.loggerService.log(`Data: ${error}`);    
            res.status(500).send(error);
        }
    }

    getAllFromUser = async (req, res) => {
        try {
            const posts = await Post.find({ user: req.query.userId });
            res.status(200).send(posts);
            this.loggerService.log(`Data: ${posts}`);           
        } catch (error) {
           this.loggerService.log(`Data: ${error}`);
           res.status(500).send(error);
        }
    }

    getPost = async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            res.status(200).send(posts);
            this.loggerService.log(`Data: ${post}`);           
        } catch (error) {
           this.loggerService.log(`Error: ${error}`); 
            res.status(500).send(error);
        }

    }

    create = async (req, res) => {
        try {
            const post = await Post.create(req.body);
            res.status(200).send(post);
            this.loggerService.log(`Data: ${post}`);
        } catch (error) {
            this.loggerService.log(`Error: ${error}`);    
            res.status(500).send(error);
        }
    }

}

module.exports = postController;