const tagMethods = require('../repositories/tags.repo');

class Functions {
    async createNewTag(tagData, userId) {
        if (!tagData.name) {
            throw new Error("A name is required.");
        } 
        return await tagMethods.create(tagData, userId);
    }

    async getAllTags(userId) {
        return await tagMethods.getAll(userId);
    }

    async updateTag(tagData, userId) {
        return await tagMethods.update(tagData, userId);
    }

    async deleteTag(tagId, userId) {
        return await tagMethods.delete(tagId, userId);
    }

    async assignToTask(linkData) {
        const { tagId, taskId } = linkData;
        return await tagMethods.assign(tagId, taskId);
    }

    async removeFromTask(linkData) {
        const { tagId, taskId } = linkData;
        return await tagMethods.remove(tagId, taskId);
    }
}

module.exports = new Functions();