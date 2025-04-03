const noteMethods = require('../repositories/notes.repo');
const { use } = require('../routes/sign-in-up.route');

// Notes services (call the repo)
class Functions {
    async createNewNote(noteData, userId) {
        if(!noteData.body) {
            throw new Error("A body is required.");
        }
        return await noteMethods.create(noteData, userId);
    }

    async getAllNotes(userId) {
        return await noteMethods.getAll(userId);
    }

    async getAllPinnedNotes(isPinned, userId) {
        return await noteMethods.getPinned(isPinned, userId);
    }

    async updateNote(noteId, noteData, userId) {
        return await noteMethods.update(noteId, noteData, userId);
    }

    async deleteNote(noteId, userId) {
        return await noteMethods.delete(noteId, userId);
    }

    async updateNotesOrder(sortorder, userId) {
        return await noteMethods.sortOrder(sortorder, userId);
    }
}

module.exports = new Functions();