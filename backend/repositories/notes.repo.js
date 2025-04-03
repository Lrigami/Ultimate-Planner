const { pool, query } = require("../config/database");

// Notes requests 
class Method {

    // Create a new note
    async create(data, userId) {
        const { title, body, color, pinned } = data;

        const query = `INSERT INTO notes (user_id, title, body, color, pinned) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const values = [userId, title || '', body, color || 'grey', pinned || false];
        const result = await pool.query(query, values);

        return result.rows[0];
    }

    // Get all notes
    async getAll(userId) {
        const result = await query(`SELECT * FROM notes WHERE user_id = $1`, [userId]);

        return result.rows;
    }

    // Get pinned notes
    async getPinned(pin, userId) {
        const { isPinned } = pin;

        const result = await query(`SELECT * FROM notes WHERE pinned = $1 AND user_id = $2`, [isPinned, userId]);

        return result.rows;
    }

    // Update a single note
    async update(id, data, userId) {
        const { title, body, color, pinned } = data;

        const query = `UPDATE notes SET title = $1, body = $2, color = $3, pinned = $4 WHERE id = $5 AND user_id = $6 RETURNING *`;
        const values = [ title || '', body, color || 'grey', pinned || false, id, userId];
        const result = await pool.query(query, values);

        return result.rows[0];
    }

    // Delete a note
    async delete(id, userId) {
        const client = await pool.connect();
    
        try {
            await client.query('BEGIN');
    
            const result = await client.query('DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING *', [id, userId]);
    
            await client.query('COMMIT');
    
            return result.rows[0];
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    }

    // update sort order of notes
    async sortOrder(sortOrderData, userId) {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');
    
            for (const { id, sort_order } of sortOrderData) {
                const result = await client.query(
                    'UPDATE notes SET sort_order = $1 WHERE id = $2 AND user_id = $3 RETURNING id',
                    [sort_order, id, userId]
                );
    
                if (result.rowCount === 0) {
                    throw new Error(`Note with id ${id} not found.`);
                }
            }
    
            await client.query('COMMIT');
    
            const result = await client.query(
                'SELECT * FROM notes WHERE user_id = $1 ORDER BY sort_order ASC',
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

module.exports = new Method("note");