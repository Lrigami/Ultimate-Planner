const { query } = require("../config/database");
const pool = require("../config/database");

class Method {

    // Methods
    async create(data) {
        const { title, description, dueDate, priority, kanban, completed } = data;

        const query = `INSERT INTO tasks (to_do_list_id, title, description, due_date, priority, kanban_category, done) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

        const values = [1, title, description || null, dueDate || null, priority || 'undefined', kanban || 'to-do', completed || false];

        const result = await pool.query(query, values);
        return result.rows[0];
    }

    async readAll() {
        const result = await query('SELECT * FROM tasks');
        return result.rows;
    }

    async readOne(id) {
        const result = await query(`SELECT * FROM tasks WHERE id = ${id}`);
        return result.rows;
    }
    
    async update(id, data) {
        const { title, description, dueDate, priority, kanban, completed } = data;

        const query = `UPDATE tasks SET title = $1, description = $2, due_date = $3, priority = $4, kanban_category = $5, done = $6 WHERE id = $7 RETURNING *`;

        const values = [title, description || null, dueDate || null, priority || 'undefined', kanban || 'to-do', completed || false, id];

        const result = await pool.query(query, values);
        return result.rows[0];
    }
    
    async delete(id) {
        const result = await query(`DELETE FROM tasks WHERE id = ${id}`);
        return result.rows;
    }
};

module.exports = new Method("tasks");