// Management of requests/responses
const taskFunctions = require('../services/tasks.service');

class Controller {
    constructor() {
        this.createNewTask = this.createNewTask.bind(this);
        this.readAllTasks = this.readAllTasks.bind(this);
        this.readOneTask = this.readOneTask.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.filterTasks = this.filterTasks.bind(this);
    }

    getTdlid(req, res) {
        const tdlid = req.params.tdlid;
        return tdlid;
    }

    async createNewTask(req, res) {
        try {
            const tdlid = this.getTdlid(req);
            const newTask = await taskFunctions.createNewTask(tdlid, req.body);
            res.status(201).json(newTask);
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }

    async readAllTasks(req, res) {
        try {
            const tdlid = this.getTdlid(req);
            const allTasks = await taskFunctions.readAllTasks(tdlid);
            res.status(200).json(allTasks);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

    async readOneTask(req, res) {
        try {
            const oneTask = await taskFunctions.readOneTask(req.params.id);
            if (!oneTask) return res.status(404).json({message: "Task not found."});
            res.status(200).json(oneTask);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

    async updateTask(req, res) {
        try {
            const updatedTask = await taskFunctions.updateTask(req.params.id, req.body);
            if (!updatedTask) return res.status(404).json({message: "Task not Found."});
            res.status(201).json(updatedTask);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

    async deleteTask(req, res) {
        try {
            const deletedTask = await taskFunctions.deleteTask(req.params.id);
            if (!deletedTask) return res.status(404).json({message: "Task not Found."});
            res.status(200).json(deletedTask);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

    async filterTasks(req, res) {
        try {  
            const tdlid = this.getTdlid(req);
            const filteredTasks = await taskFunctions.filterTasks(tdlid, req.body);
            if (!filteredTasks) return res.status(404).json({message: "Tasks not found."});
            res.status(201).json(filteredTasks);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }
}

module.exports = new Controller();