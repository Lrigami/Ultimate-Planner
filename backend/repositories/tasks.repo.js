const { query } = require("../config/database");
const pool = require("../config/database");

class Method {
    async create(tdlid, data) {
        const { title, description, due_date, priority, kanban_category, done } = data;

        const query = `INSERT INTO tasks (to_do_list_id, title, description, due_date, priority, kanban_category, done) VALUES ($1, $2, $3, $4, $5, $6, $7)  RETURNING *`;

        const values = [tdlid, title, description || null, due_date || null, priority || 'undefined', kanban_category || 'to-do', done || false];

        const result = await pool.query(query, values);
        return result.rows[0];
    }

    async readAll(tdlid) {
        const result = await query(`SELECT * FROM tasks WHERE to_do_list_id = $1`, [tdlid]);
        return result.rows;
    }

    async readOne(id) {
        const result = await query(`SELECT * FROM tasks WHERE id = $1`, [id]);
        return result.rows;
    }
    
    async update(id, data) {
        const { title, description, due_date, priority, kanban_category, done } = data;

        const query = `UPDATE tasks SET title = $1, description = $2, due_date = $3, priority = $4, kanban_category = $5, done = $6 WHERE id = $7 RETURNING *`;

        const values = [title, description || null, due_date || null, priority || 'undefined', kanban_category || 'to-do', done || false, id];

        const result = await pool.query(query, values);
        return result.rows[0];
    }
    
    async delete(id) {
        const result = await query(`DELETE FROM tasks WHERE id = $1`, [id]);
        return result.rows;
    }
};

module.exports = new Method("tasks");