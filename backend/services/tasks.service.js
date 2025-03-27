// Functions that call the methods in taskRepository
const taskMethods = require('../repositories/tasks.repo');

class Functions {
    async createNewTask(tdlid, taskData, userId) {
        if(!taskData.title) {
            throw new Error("A title is required.");
        }
        return await taskMethods.create(tdlid, taskData, userId);
    }

    async readAllTasks(tdlid, userId) {
        return await taskMethods.readAll(tdlid, userId);
    }

    async readOneTask(taskId, tdlid, userId) {
        return await taskMethods.readOne(taskId, tdlid, userId);
    }

    async updateTask(taskId, taskData, tdlid, userId) {
        return await taskMethods.update(taskId, taskData, tdlid, userId);
    }

    async deleteTask(taskId, tdlid, userId) {
        return await taskMethods.delete(taskId, tdlid, userId);
    }

    async filterTasks(tdlid, filters, userId) {
        const { priority, operator, duedate } = filters;
        const safeOperator = operator.toUpperCase() === 'AND' ? 'AND' : 'OR';
        return await taskMethods.filter(tdlid, priority, safeOperator, duedate, userId);
    }
}

module.exports = new Functions();