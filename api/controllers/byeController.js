class byeController {
    constructor() {
        this.bye = this.bye.bind(this);
    }
    bye(req, res) {
        res.send('Bye!');
    } 
}

module.exports = byeController;