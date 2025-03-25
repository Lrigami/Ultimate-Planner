const authMethods = require('../repositories/sign-in-up.repo');

class Functions {
    async createNewUser(userData) {
        return await authMethods.create(userData);
    }

    async getOneUser(userId) {
        return await authMethods.getone(userId);
    }

    async updateUser(userId, userData) {
        return await authMethods.update(userId, userData);
    }

    async deleteUser(userId) {
        return await authMethods.delete(userId);
    }
}

module.exports = new Functions();