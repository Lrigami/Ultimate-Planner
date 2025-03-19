const { pool, query } = require("../config/database");

class Method {

    async create(data) {
        // créer une to-do list (titre, couleur, pinned)
        const { title, pinned, color } = data;

        const query = `INSERT INTO to_do_lists (user_id, title, pinned, color) VALUES ($1, $2, $3, $4) RETURNING *`;

        const values = [1, title, pinned || false, color || 'grey'];

        const result = await pool.query(query, values);

        return result.rows[0];
    }

    async readAll() {
        // lire toutes les to-do lists : pour la liste des to-do lists
        const result = await query(`SELECT * FROM to_do_lists`);
        return result.rows;
    }

    async readOne(id) {
        // lire une seule to-do list : pour les cartes to-do list
        const result = await query(`SELECT * FROM to_do_lists WHERE id = $1`, [id]);
        return result.rows;
    }

    async update(id, data) {
        // pour mettre à jour une to-do list (son titre, sa couleur, pin ou pas)
        const { title, pinned, color } = data;

        const query = `UPDATE to_do_lists SET title = $1, pinned = $2, color = $3 WHERE id = $4 RETURNING *`;

        const values = [title, pinned || false, color || 'grey', id];

        const result = await pool.query(query, values);
        return result.rows[0];
    }

    async delete(id) {
        // pour supprimer une to-do list (attention il faut aussi supprimer toutes les tâches qu'elle contient).
        const client = await pool.connect(); // Un client représente une connexion active à la base de données. 

        try {
            // J'utilise BEGIN, COMMIT, ROLLBACK pour éviter que tout soit perdu en cas de problème.
            await client.query('BEGIN');

            await client.query('DELETE FROM tasks WHERE to_do_list_id = $1', [id]);

            const result = await client.query('DELETE FROM to_do_lists WHERE id = $1 RETURNING *', [id]);

            await client.query('COMMIT');

            return result.rows[0];
        } catch (err) {
            await client.query('ROLLBACK');
            throw err; // On relance l'erreur pour qu'elle soit gérée plus haut
        } finally {
            client.release();
        }
    }

    async countTasksInList(listid) {
        const query = `SELECT COUNT(id) FROM tasks WHERE to_do_list_id = $1`;

        const values = [listid];

        const result = await pool.query(query, values);
        return result.rows[0].count;
    }

    async countDoneTasksInList(listid) {
        const query = `SELECT COUNT(id) FROM tasks WHERE to_do_list_id = $1 AND done = $2`;

        const values = [listid, true];

        const result = await pool.query(query, values);
        return result.rows[0].count;
    }
}

module.exports = new Method("todolist");