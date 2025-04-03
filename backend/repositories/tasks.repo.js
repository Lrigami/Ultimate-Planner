const { pool, query } = require("../config/database");

// Tasks requests
class Method {

    // Check if list is one of user's list before doing anything 
    // This function is called in the others functions below
    async checkOwnership(tdlid, userId) {
        const query = `
            SELECT 1
            FROM to_do_lists
            WHERE id = $1 AND user_id = $2
        `;
        const values = [tdlid, userId];
        const result = await pool.query(query, values);
    
        if (result.rows.length === 0) {
            throw new Error('Unauthorized access to this to-do list');
        }
    
        return true;
    }

    // Create a new task in a given to-do list
    async create(tdlid, data, userId) {
        await this.checkOwnership(tdlid, userId);

        const { title, description, due_date, priority, kanban_category, done } = data;

        const query = `INSERT INTO tasks (to_do_list_id, title, description, due_date, priority, kanban_category, done) VALUES ($1, $2, $3, $4, $5, $6, $7)  RETURNING *`;
        const values = [tdlid, title, description || null, due_date || null, priority || 'undefined', kanban_category || 'to-do', done || false];
        const result = await pool.query(query, values);

        return result.rows[0];
    }

    // Get all tasks in a given to-do list
    async readAll(tdlid, userId) {
        await this.checkOwnership(tdlid, userId);

        const result = await query(`SELECT * FROM tasks WHERE to_do_list_id = $1 `, [tdlid]);
        return result.rows;
    }

    // Get one task in a given to-do list by id
    async readOne(id, tdlid, userId) {
        await this.checkOwnership(tdlid, userId);
        const result = await query(`SELECT * FROM tasks WHERE id = $1`, [id]);
        return result.rows;
    }
    
    // Update data of a given task
    async update(id, data, tdlid, userId) {
        await this.checkOwnership(tdlid, userId);

        const { title, sort_order, description, due_date, priority, kanban_category, done } = data;

        const query = `UPDATE tasks SET title = $1, sort_order = $2, description = $3, due_date = $4, priority = $5, kanban_category = $6, done = $7 WHERE id = $8 RETURNING *`;
        const values = [title,  sort_order || null, description || null, due_date || null, priority || 'undefined', kanban_category || 'to-do', done || false, id];
        const result = await pool.query(query, values);

        return result.rows[0];
    }
    
    // Delete a given task
    async delete(id, tdlid, userId) {
        await this.checkOwnership(tdlid, userId);

        const result = await query(`DELETE FROM tasks WHERE id = $1`, [id]);

        return result.rows;
    }

    // Filter tasks in a given to-do list
    async filter(tdlid, priorityArray, safeOperator, dueDateArray, userId) {
        await this.checkOwnership(tdlid, userId);

        // If no filter is applied, then stop this function now
        if (priorityArray.length == 0 && dueDateArray.length == 0) return;

        let query = `SELECT * FROM tasks WHERE to_do_list_id = $1 AND (`;
        let values = [tdlid];

        // To get all checked priority filters and add them to the request
        if (Array.isArray(priorityArray) && priorityArray.length > 0) {
            const priorityPlaceholders = priorityArray.map((_, index) => `$${values.length + index + 1}`).join(', ');
            values.push(...priorityArray);
            query += ` priority IN (${priorityPlaceholders})`;
        }

        // To get all checked due date filters and add them to the request
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

            // if there are priority AND due date filter, then the request needs to take into consideration the selected operator (AND | OR), else there is no need for it.
            if (dueDateConditions.length > 0) {
                if (priorityArray.length > 0) {
                    query += ` ${safeOperator} (${dueDateConditions.join(' OR ')})`;
                } else {
                    query += ` (${dueDateConditions.join(' OR ')})`;
                }
            }
        }

        // end the query correctly
        query += `);`;

        const result = await pool.query(query, values);

        return result.rows;
    }

    // To update order of tasks in a given to-do list (user can drag and drop tasks)
    async sortOrder(tdlid, sortOrderData, userId) {
        await this.checkOwnership(tdlid, userId);

        const client = await pool.connect();

        try {
            await client.query('BEGIN');
    
            // update more than sort_order because if user drop a task in another category, kanban_category and done need to update their value
            for (const { id, kanban_category, done, sort_order } of sortOrderData) {
                const result = await client.query(
                    'UPDATE tasks SET sort_order = $1, kanban_category = $2, done = $3 WHERE id = $4 RETURNING id',
                    [sort_order, kanban_category, done, id]
                );
    
                if (result.rowCount === 0) {
                    throw new Error(`Task with id ${id} not found.`);
                }
            }
    
            await client.query('COMMIT');
    
            // Sort tasks by sort_order (ascending order)
            const result = await client.query(
                'SELECT * FROM tasks WHERE to_do_list_id = $1 ORDER BY sort_order ASC',
                [tdlid]
            );
    
            return result.rows;
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    }
};

module.exports = new Method("tasks");