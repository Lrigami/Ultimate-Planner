const todolistMethods = require('../repositories/todolist.repo');

class Functions {
    async createNewList(listData) {
        if (!listData.title) {
            throw new Error("A title is required.");
        }
        return await todolistMethods.create(listData);
    }

    async readAllLists() {
        return await todolistMethods.readAll();
    }

    async readOneList(listId) {
        return await todolistMethods.readOne(listId);
    }

    async updateList(listId, listData) {
        return await todolistMethods.update(listId, listData);
    }

    async deleteList(listId) {
        return await todolistMethods.delete(listId);
    }

    async countTasks(listId) {
        return await todolistMethods.countTasksInList(listId);
    }

    async countDoneTasks(listId) {
        return await todolistMethods.countDoneTasksInList(listId);
    }
}

module.exports = new Functions();