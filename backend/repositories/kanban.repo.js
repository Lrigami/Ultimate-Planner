const { query } = require("../config/database");
const pool = require("../config/database");

class Method {
    async getAllKanban() {
        const result = await query("SELECT unnest(enum_range(NULL::kanban_category)) AS kanban_category");
        return result.rows.map(row => row.kanban_category);
    }
}

module.exports = new Method("tasks");