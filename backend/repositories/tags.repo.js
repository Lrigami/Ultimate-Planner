const { pool, query } = require('../config/database');

class Method {
    async create(data, userId) {
        const { name, color } = data;

        const query = `INSERT INTO tags (user_id, name, color) VALUES ($1, $2, $3) RETURNING *`;
        const values = [userId, name, color || 'grey'];
        const result = await pool.query(query, values);
        
        return result.rows[0];
    }

    async getAll(userId) {
        const result = await query(`SELECT * FROM tags WHERE user_id = $1`, [userId]);
        
        return result.rows;
    }

    async update(data, userId) {
        const { id, name, color } = data;

        const query = `UPDATE tags SET name = $1, color = $2 WHERE id = $3 AND user_id = $4 RETURNING *`;
        const values = [name, color || 'grey', id, userId];
        const result = pool.query(query, values);

        return result.rows[0];
    }

    async delete(id, userId) {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            const result = await client.query(`DELETE FROM tags WHERE id = $1 AND user_id = $2 RETURNING *`, [id, userId]);

            if (result.rowCount === 0) {
                throw new Error(`Tag with id ${id} not found.`);
            }

            await client.query('COMMIT');

            return result.rows[0];
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    }

    async assign(tagId, taskId) {
        const result = await query(`INSERT INTO task_tags (task_id, tag_id) VALUES ($1, $2) RETURNING *`, [taskId, tagId]);

        return result.rows[0];
    }

    async remove(id) {
        const { taskId } = id;

        const result = await query(`DELETE FROM task_tags WHERE task_id = $1`, [taskId]);

        return result.rows[0];
    }

    async retreive(id) {
        const { taskId } = id;
        
        const result = await query(`SELECT tags.* FROM tags JOIN task_tags ON tags.id = task_tags.tag_id WHERE task_tags.task_id = $1`, [taskId]);

        return result.rows;
    }
}

module.exports = new Method("tags");