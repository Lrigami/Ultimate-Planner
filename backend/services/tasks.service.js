// Functions that call the methods in taskRepository
const taskMethods = require('../repositories/tasks.repo');

class Functions {
    async createNewTask(tdlid, taskData) {
        if(!taskData.title) {
            throw new Error("A title is required.");
        }
        return await taskMethods.create(tdlid, taskData);
    }

    async readAllTasks(tdlid) {
        return await taskMethods.readAll(tdlid);
    }

    async readOneTask(taskId) {
        return await taskMethods.readOne(taskId);
    }

    async updateTask(taskId, taskData) {
        return await taskMethods.update(taskId, taskData);
    }

    async deleteTask(taskId) {
        return await taskMethods.delete(taskId);
    }
}

module.exports = new Functions();