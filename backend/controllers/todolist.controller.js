const todolistFunctions = require('../services/todolist.service');

class Controller {
    constructor() {
        this.createNewList = this.createNewList.bind(this);
        this.readAllLists = this.readAllLists.bind(this);
        this.readOneList = this.readOneList.bind(this);
        this.getPinnedLists = this.getPinnedLists.bind(this);
        this.updateList = this.updateList.bind(this);
        this.deleteList = this.deleteList.bind(this);
        this.countTasks = this.countTasks.bind(this);
        this.countDoneTasks = this.countDoneTasks.bind(this);
        this.sortTodolistOrder = this.sortTodolistOrder.bind(this);
    }

    async createNewList(req, res) {
        const userId = req.user.userId;
            try {
                const newList = await todolistFunctions.createNewList(req.body, userId);
                res.status(201).json(newList);
            } catch (err) {
                res.status(500).json({message: err.message})
            }
        }
    
    async readAllLists(req, res) {
        const userId = req.user.userId;
        try {
            const allLists = await todolistFunctions.readAllLists(userId);
            res.status(200).json(allLists);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

    async readOneList(req, res) {
        const userId = req.user.userId;
        try {
            const oneList = await todolistFunctions.readOneList(req.params.tdlid, userId);
            if (!oneList) return res.status(404).json({message: "List not Found."});
            res.status(200).json(oneList);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

    async getPinnedLists(req, res) {
        const userId = req.user.userId;
        try {
            const pinnedList = await todolistFunctions.getPinnedLists(req.body, userId);
            res.status(200).json(pinnedList);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async updateList(req, res) {
        const userId = req.user.userId;
        try {
            const updatedList = await todolistFunctions.updateList(req.params.tdlid, req.body, userId);
            if (!updatedList) return res.status(404).json({message: "List not Found."});
            res.status(201).json(updatedList);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

    async deleteList(req, res) {
        const userId = req.user.userId;
        try {
            const deletedList = await todolistFunctions.deleteList(req.params.tdlid, userId);
            if (!deletedList) return res.status(404).json({message: "List not Found."});
            res.status(200).json(deletedList);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

    async countTasks(req, res) {
        const userId = req.user.userId;
        try {
            const listTasks = await todolistFunctions.countTasks(req.params.tdlid, userId);
            if (!listTasks) return res.status(404).json({message: "List not Found."});
            res.status(200).json(listTasks);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

    async countDoneTasks(req, res) {
        const userId = req.user.userId;
        try {
            const listDoneTasks = await todolistFunctions.countDoneTasks(req.params.tdlid, userId);
            if (!listDoneTasks) return res.status(404).json({message: "List not Found."});
            res.status(200).json(listDoneTasks);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

    async sortTodolistOrder(req, res) {
        const userId = req.user.userId;
        try { 
            const sortedTodolists = await todolistFunctions.sortTodolistsOrder(req.body, userId);
            if (!sortedTodolists) return res.status(404).json({message: "To-do lists not found."});
            res.status(201).json(sortedTodolists);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }
}

module.exports = new Controller();