const tagFunctions = require('../services/tags.service');

class Controller {
    constructor() {
        this.createNewTag = this.createNewTag.bind(this);
        this.getAllTags = this.getAllTags.bind(this);
        this.updateTag = this.updateTag.bind(this);
        this.deleteTag = this.deleteTag.bind(this);
        this.assignToTask = this.assignToTask.bind(this);
        this.removeFromTask = this.removeFromTask.bind(this);
        this.getTagFromTask = this.getTagFromTask.bind(this);
    }

    async createNewTag(req, res) {
        const userId = req.user.userId;
        try {
            const newTag = await tagFunctions.createNewTag(req.body, userId);
            res.status(201).json(newTag);
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }

    async getAllTags(req, res) {
        const userId = req.user.userId;
        try {
            const allTags = await tagFunctions.getAllTags(userId);
            res.status(200).json(allTags);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

    async updateTag(req, res) {
        const userId = req.user.userId;
        try {
            const updatedTag = await tagFunctions.updateTag(req.body, userId);
            if (!updatedTag) return res.status(404).json({message: "Tag not Found."});
            res.status(201).json(updatedTask);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

    async deleteTag(req, res) {
        const userId = req.user.userId;
        try {
            const deletedTag = await tagFunctions.deleteTag(req.params.tagid, userId);
            if (!deletedTag) return res.status(404).json({message: "Tag not Found."});
            res.status(200).json(deletedTask);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

    async assignToTask(req, res) {
        try {
            const assignedTags = await tagFunctions.assignToTask(req.body);
            res.status(200).json(assignedTags);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

    async removeFromTask(req, res) {
        try {
            const removedTags = await tagFunctions.removeFromTask(req.body);
            res.status(200).json({removedTags});
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

    async getTagFromTask(req, res) {
        try {
            const retreivedTags = await tagFunctions.getTagFromTask(req.body);
            res.status(200).json({retreivedTags});
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }
}

module.exports = new Controller();