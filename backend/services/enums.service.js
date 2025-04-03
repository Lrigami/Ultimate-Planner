const enumsMethods = require('../repositories/enums.repo');

// Enums type services (call repo)
class Functions {
    async getAllKanban() {
        return await enumsMethods.getAllKanban();
    }

    async getAllPriority() {
        return await enumsMethods.getAllPriority();
    }
}

module.exports = new Functions();