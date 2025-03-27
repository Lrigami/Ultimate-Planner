const todolistMethods = require('../repositories/todolist.repo');

class Functions {
    async createNewList(listData, userId) {
        if (!listData.title) {
            throw new Error("A title is required.");
        }
        return await todolistMethods.create(listData, userId);
    }

    async readAllLists(userId) {
        return await todolistMethods.readAll(userId);
    }

    async readOneList(listId, userId) {
        return await todolistMethods.readOne(listId, userId);
    }

    async updateList(listId, listData, userId) {
        return await todolistMethods.update(listId, listData, userId);
    }

    async deleteList(listId, userId) {
        return await todolistMethods.delete(listId, userId);
    }

    async countTasks(listId, userId) {
        return await todolistMethods.countTasksInList(listId, userId);
    }

    async countDoneTasks(listId, userId) {
        return await todolistMethods.countDoneTasksInList(listId, userId);
    }
}

module.exports = new Functions();