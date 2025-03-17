const kanbanFunctions = require('../services/kanban.service');

class Controller {
    constructor() {
        this.getAllKanban = this.getAllKanban.bind(this);
    }

    async getAllKanban(req, res) {
        try {
            const kanbanList = await kanbanFunctions.getAllKanban();
            if (!kanbanList) return res.status(400).json({message : "No kanban categories found."});
            res.status(200).json(kanbanList);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }
}

module.exports = new Controller();