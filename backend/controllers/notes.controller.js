const noteFunctions = require('../services/notes.service');

// Notes controller
class Controller {
    constructore() {
        this.createNewNote = this.createNewNote.bind(this);
        this.getAllNotes = this.getAllNotes.bind(this);
        this.updateNote = this.updateNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this.getAllPinnedNotes = this.getAllPinnedNotes.bind(this);
        this.updateNotesOrder = this.updateNotesOrder.bind(this);
    }

    async createNewNote(req, res) {
        const userId = req.user.userId;
        try {
            const newNote = await noteFunctions.createNewNote(req.body, userId);
            res.status(201).json(newNote);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async getAllNotes(req, res) {
        const userId = req.user.userId;
        try {
            const allNotes = await noteFunctions.getAllNotes(userId);
            res.status(200).json(allNotes);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async getAllPinnedNotes(req, res) {
        const userId = req.user.userId;
        try {
            const pinnedNotes = await noteFunctions.getAllPinnedNotes(req.body, userId);
            res.status(200).json(pinnedNotes);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async updateNote(req, res) {
        const userId = req.user.userId;
        try {
            const updatedNote = await noteFunctions.updateNote(req.params.noteid, req.body, userId);
            if (!updatedNote) return res.status(404).json({message: "Note not found."});
            res.status(201).json(updatedNote);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async deleteNote(req, res) {
        const userId = req.user.userId;
        try {
            const deletedNote = await noteFunctions.deleteNote(req.params.noteid, userId);
            if (!deletedNote) return res.status(404).json({message: "Note not found."});
            res.status(200).json(deletedNote);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async updateNotesOrder(req, res) {
        const userId = req.user.userId;
        try {
            const sortedNotes = await noteFunctions.updateNotesOrder(req.body, userId);
            if (!sortedNotes) return res.status(404).json({message: "Note not found."});
            res.status(201).json(sortedNotes);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}

module.exports = new Controller();