class helloController {
    constructor(texto, loggerService) {
        this.texto = texto;
        this.loggerService = loggerService;
    }

    hello = (req, res) => {
        res.send('Hello World! ' + this.loggerService.log(this.texto));
    }
}

module.exports = helloController;