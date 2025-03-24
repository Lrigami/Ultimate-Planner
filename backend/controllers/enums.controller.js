const enumsFunctions = require('../services/enums.service');

class Controller {
    constructor() {
        this.getAllKanban = this.getAllKanban.bind(this);
        this.getAllPriority = this.getAllPriority.bind(this);
    }

    async getAllKanban(req, res) {
        try {
            const kanbanList = await enumsFunctions.getAllKanban();
            if (!kanbanList) return res.status(400).json({message : "No kanban categories found."});
            res.status(200).json(kanbanList);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

    async getAllPriority(req, res) {
        try {
            const priorityList = await enumsFunctions.getAllPriority();
            if (!priorityList) return res.status(400).json({message : "No priority categories found."});
            res.status(200).json(priorityList);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }
}

module.exports = new Controller();