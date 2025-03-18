const todolistFunctions = require('../services/todolist.service');

class Controller {
    constructor() {
        this.createNewList = this.createNewList.bind(this);
        this.readAllLists = this.readAllLists.bind(this);
        this.readOneList = this.readOneList.bind(this);
        this.updateList = this.updateList.bind(this);
        this.deleteList = this.deleteList.bind(this);
    }

    async createNewList(req, res) {
            try {
                const newList = await todolistFunctions.createNewList(req.body);
                res.status(201).json(newList);
            } catch (err) {
                res.status(500).json({message: err.message})
            }
        }
    
        async readAllLists(req, res) {
            try {
                const allLists = await todolistFunctions.readAllLists();
                res.status(200).json(allLists);
            } catch (err) {
                res.status(500).json({message: err.message});
            }
        }
    
        async readOneList(req, res) {
            try {
                const oneList = await todolistFunctions.readOneList(req.params.id);
                if (!oneList) return res.status(404).json({message: "List not Found."});
                res.status(200).json(oneList);
            } catch (err) {
                res.status(500).json({message: err.message});
            }
        }
    
        async updateList(req, res) {
            try {
                const updatedList = await todolistFunctions.updateList(req.params.id, req.body);
                if (!updatedList) return res.status(404).json({message: "List not Found."});
                res.status(201).json(updatedList);
            } catch (err) {
                res.status(500).json({message: err.message});
            }
        }
    
        async deleteList(req, res) {
            try {
                const deletedList = await todolistFunctions.deleteList(req.params.id);
                if (!deletedList) return res.status(404).json({message: "List not Found."});
                res.status(200).json(deletedList);
            } catch (err) {
                res.status(500).json({message: err.message});
            }
        }
}

module.exports = new Controller();