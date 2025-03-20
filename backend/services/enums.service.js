const enumsMethods = require('../repositories/enums.repo');

class Functions {
    async getAllKanban() {
        return await enumsMethods.getAllKanban();
    }

    async getAllPriority() {
        return await enumsMethods.getAllPriority();
    }
}

module.exports = new Functions();