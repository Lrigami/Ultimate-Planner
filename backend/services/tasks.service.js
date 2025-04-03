const taskMethods = require('../repositories/tasks.repo');

// Tasks services (call the repo)
class Functions {
    async createNewTask(tdlid, taskData, userId) {
        // check if a title is provided
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
        // check data to pass correct informations to repo
        const { priority, operator, duedate } = filters;
        const safeOperator = operator.toUpperCase() === 'AND' ? 'AND' : 'OR';
        return await taskMethods.filter(tdlid, priority, safeOperator, duedate, userId);
    }

    async sortTaskOrder(tdlid, sortorder, userId) {
        return await taskMethods.sortOrder(tdlid, sortorder, userId);
    }
}

module.exports = new Functions();