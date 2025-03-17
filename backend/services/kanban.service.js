const kanbanMethods = require('../repositories/kanban.repo');

class Functions {
    async getAllKanban() {
        return await kanbanMethods.getAllKanban();
    }
}

module.exports = new Functions();