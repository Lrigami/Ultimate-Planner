// Functions that call the methods in taskRepository
const taskMethods = require('../repositories/tasks.repo');

class Functions {
    async createNewTask(taskData) {
        if(!taskData.title) {
            throw new Error("A title is required.");
        }
        return await taskMethods.create(taskData);
    }

    async readAllTasks() {
        return await taskMethods.readAll();
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