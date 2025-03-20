const { query } = require("../config/database");
const pool = require("../config/database");

class Method {
    async getAllKanban() {
        const result = await query("SELECT unnest(enum_range(NULL::kanban_category)) AS kanban_category");
        return result.rows.map(row => row.kanban_category);
    }

    async getAllPriority() {
        const result = await query("SELECT unnest(enum_range(NULL::priority_level)) AS priority_level");
        return result.rows.map(row => row.priority_level);
    }
}

module.exports = new Method("tasks");