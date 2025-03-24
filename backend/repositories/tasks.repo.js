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

    async filter(tdlid, priorityArray, safeOperator, dueDateArray) {
        let query = `SELECT * FROM tasks WHERE to_do_list_id = $1 AND (`;
        let values = [tdlid];

        if (Array.isArray(priorityArray) && priorityArray.length > 0) {
            const priorityPlaceholders = priorityArray.map((_, index) => `$${values.length + index + 1}`).join(', ');
            values.push(...priorityArray);
            query += ` priority IN (${priorityPlaceholders})`;
        }

        if (Array.isArray(dueDateArray) && dueDateArray.length > 0) {
            let dueDateConditions = [];

            dueDateArray.forEach((date) => {
                if (date === "today") {
                    dueDateConditions.push(`due_date = CURRENT_DATE`);
                } else if (date === "tomorrow") {
                    dueDateConditions.push(`due_date >= CURRENT_DATE AND due_date <= CURRENT_DATE + INTERVAL '1 day'`);
                } else if (date === "this week") {
                    dueDateConditions.push(`due_date >= DATE_TRUNC('week', CURRENT_DATE) AND due_date < DATE_TRUNC('week', CURRENT_DATE) + INTERVAL '1 week'`);
                } else if (date === "this month") {
                    dueDateConditions.push(`due_date >= DATE_TRUNC('month', CURRENT_DATE) AND due_date < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'`);
                }
            });

            if (dueDateConditions.length > 0) {
                if (priorityArray.length > 0) {
                    query += ` ${safeOperator} (${dueDateConditions.join(' OR ')})`;
                } else {
                    query += ` (${dueDateConditions.join(' OR ')})`;
                }
            }
        }

        query += `);`;

        console.log("query: ", query);
        console.log("values: ", values);

        const result = await pool.query(query, values);
        return result.rows;
    }
};

module.exports = new Method("tasks");