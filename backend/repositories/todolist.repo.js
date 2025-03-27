const { pool, query } = require("../config/database");
const { use } = require("../routes/todolist.route");

class Method {

    async create(data, userId) {
        // créer une to-do list (titre, couleur, pinned)
        const { title, pinned, color } = data;

        const query = `INSERT INTO to_do_lists (user_id, title, pinned, color) VALUES ($1, $2, $3, $4) RETURNING *`;

        const values = [userId, title, pinned || false, color || 'grey'];

        const result = await pool.query(query, values);

        return result.rows[0];
    }

    async readAll(userId) {
        // lire toutes les to-do lists : pour la liste des to-do lists
        const result = await query(`SELECT * FROM to_do_lists WHERE user_id = $1`, [userId]);
        return result.rows;
    }

    async readOne(id, userId) {
        // lire une seule to-do list : pour les cartes to-do list
        const result = await query(`SELECT * FROM to_do_lists WHERE id = $1 AND user_id = $2`, [id, userId]);
        return result.rows;
    }

    async update(id, data, userId) {
        // pour mettre à jour une to-do list (son titre, sa couleur, pin ou pas)
        const { title, pinned, color } = data;

        const query = `UPDATE to_do_lists SET title = $1, pinned = $2, color = $3 WHERE id = $4 AND user_id = $5 RETURNING *`;

        const values = [title, pinned || false, color || 'grey', id, userId];

        const result = await pool.query(query, values);
        return result.rows[0];
    }

    async delete(id, userId) {
        const client = await pool.connect();
    
        try {
            // J'utilise BEGIN, COMMIT, ROLLBACK pour éviter que tout soit perdu en cas de problème.
            await client.query('BEGIN');
    
            const result = await client.query('DELETE FROM to_do_lists WHERE id = $1 AND user_id = $2 RETURNING *', [id, userId]);
    
            await client.query('COMMIT');
    
            return result.rows[0];
        } catch (err) {
            await client.query('ROLLBACK');
            throw err; // On relance l'erreur pour qu'elle soit gérée plus haut
        } finally {
            client.release();
        }
    }

    async countTasksInList(listid, userId) {
        const query = `SELECT COUNT(tasks.id) FROM tasks INNER JOIN to_do_lists ON tasks.to_do_list_id = to_do_lists.id WHERE to_do_lists.id = $1 AND to_do_lists.user_id = $2`;

        const values = [listid, userId];

        const result = await pool.query(query, values);
        return result.rows[0].count;
    }

    async countDoneTasksInList(listid, userId) {
        const query = `SELECT COUNT(tasks.id) FROM tasks INNER JOIN to_do_lists ON tasks.to_do_list_id = to_do_lists.id WHERE to_do_lists.id = $1 AND to_do_lists.user_id = $2 AND tasks.done = $3`;

        const values = [listid, userId, true];

        const result = await pool.query(query, values);
        return result.rows[0].count;
    }
}

module.exports = new Method("todolist");