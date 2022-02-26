const LoggerService = require('../services/loggerService');
const { HelloController, UserController, PostController } = require('../controllers');

class factoryController {
    
    static createHelloController = () => {
        const loggerService = new LoggerService();
        return new HelloController("texto mostrado por el service", loggerService); 
    }

    static createUserController = () => {
        const loggerService = new LoggerService();
        return new UserController(loggerService);
    }

    static createPostController = () => {
        const loggerService = new LoggerService();
        return new PostController(loggerService);
    }
}

module.exports = factoryController;