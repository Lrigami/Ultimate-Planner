const { pool, query } = require("../config/database");

// To-do lists requests
class Method {

    // Create a new to-do list
    async create(data, userId) {
        const { title, pinned, color } = data;

        const query = `INSERT INTO to_do_lists (user_id, title, pinned, color) VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [userId, title, pinned || false, color || 'grey'];
        const result = await pool.query(query, values);

        return result.rows[0];
    }

    // Get all to-do lists from a given user
    async readAll(userId) {
        const result = await query(`SELECT * FROM to_do_lists WHERE user_id = $1`, [userId]);

        return result.rows;
    }

    // Get a single to-do list from a given user, by id
    async readOne(id, userId) {
        const result = await query(`SELECT * FROM to_do_lists WHERE id = $1 AND user_id = $2`, [id, userId]);

        return result.rows;
    }

    // Get all pinned to-do lists of a given user
    async getPinned(pin, userId) {
        const { isPinned } = pin;

        const result = await query(`SELECT * FROM to_do_lists WHERE pinned = $1 AND user_id = $2`, [isPinned, userId]);

        return result.rows;
    }

    // Update a single to-do list of a given user
    async update(id, data, userId) {
        const { title, pinned, color } = data;

        const query = `UPDATE to_do_lists SET title = $1, pinned = $2, color = $3 WHERE id = $4 AND user_id = $5 RETURNING *`;
        const values = [title, pinned || false, color || 'grey', id, userId];
        const result = await pool.query(query, values);

        return result.rows[0];
    }

    // Delete a to-do list by id
    async delete(id, userId) {
        const client = await pool.connect();
    
        try {
            await client.query('BEGIN');
    
            const result = await client.query('DELETE FROM to_do_lists WHERE id = $1 AND user_id = $2 RETURNING *', [id, userId]);
    
            await client.query('COMMIT');
    
            return result.rows[0];
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    }

    // Count all the tasks in a given to-do list
    async countTasksInList(listid, userId) {
        const query = `SELECT COUNT(tasks.id) FROM tasks INNER JOIN to_do_lists ON tasks.to_do_list_id = to_do_lists.id WHERE to_do_lists.id = $1 AND to_do_lists.user_id = $2`;
        const values = [listid, userId];
        const result = await pool.query(query, values);

        return result.rows[0].count;
    }

    // Count all the tasks marked as "done" in a given to-do list
    async countDoneTasksInList(listid, userId) {
        const query = `SELECT COUNT(tasks.id) FROM tasks INNER JOIN to_do_lists ON tasks.to_do_list_id = to_do_lists.id WHERE to_do_lists.id = $1 AND to_do_lists.user_id = $2 AND tasks.done = $3`;
        const values = [listid, userId, true];
        const result = await pool.query(query, values);

        return result.rows[0].count;
    }

    // update order of to-do lists of a given user (user can drag and drop)
    async sortOrder(sortOrderData, userId) {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');
    
            for (const { id, sort_order } of sortOrderData) {
                const result = await client.query(
                    'UPDATE to_do_lists SET sort_order = $1 WHERE id = $2 AND user_id = $3 RETURNING id',
                    [sort_order, id, userId]
                );
    
                if (result.rowCount === 0) {
                    throw new Error(`To-do list with id ${id} not found.`);
                }
            }
    
            await client.query('COMMIT');
    
            const result = await client.query(
                'SELECT * FROM to_do_lists WHERE user_id = $1 ORDER BY sort_order ASC',
                [userId]
            );
    
            return result.rows;
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    }
}

module.exports = new Method("todolist");