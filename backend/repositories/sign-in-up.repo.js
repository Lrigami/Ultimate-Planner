const { pool, query } = require("../config/database");
const bcrypt = require('bcrypt');

class Method {
    
    async create(data) {
        const { email, password } = data;

        const saltRounds = 10; // Détermine la complexité du salt (plus c'est élevé, plus c'est sécurisé mais lent)
        const salt = await bcrypt.genSalt(saltRounds);

        const hashed_password = await bcrypt.hash(password, salt);

        const query = `INSERT INTO users (email, salt, hashed_password, username, profile_picture, role) VALUES ($1, $2, $3, $4, $5, $6)`;


        const values = [email, salt, hashed_password, 'new user', null, 'user'];

        const result = await pool.query(query, values);

        return result.rows[0];
    }

    async getOne(id) {
        const result = await query(`SELECT * FROM users WHERE id = $1`, [id]);
        return result.rows;
    }

    async update(id, data) {
        const { email, salt, hashed_password, username, profile_picture, role } = data;

        const query = `UPDATE users SET email = $1, salt = 2, hashed_password = $3, username = $4, profile_picture = $5, role = $6 WHERE id = $7`;

        const values = [ email, salt, hashed_password, username || 'new user', profile_picture || null, role || 'user', id];

        const result = await pool.query(query, values);
        return result.rows[0];
    }

    async delete(id) {
        // Attention ici, quand on supprime un utilisateur il faut supprimer tout ce qui lui est associé (to-do-lists et tâches dans chacune, notes ...).

        const client = await pool.connect();

        try {
            // J'utilise BEGIN, COMMIT, ROLLBACK pour éviter que tout soit perdu en cas de problème.
            await client.query('BEGIN');

            const result = await client.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);

            await client.query('COMMIT');

            return result.rows[0];
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    }

    async getUserByEmail(email) {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0] || null;
    };

    async isEmailTaken(emailToVerify) {
        const query = 'SELECT * FROM users WHERE email = $1';
        const values = [emailToVerify.email];
        const result = await pool.query(query, values);
        return result.rows[0] || null;
    };

    // password 

    async storePasswordToken(email, hashedToken) {
        const query = `UPDATE users SET reset_password_token = $1, reset_token_expiration = NOW() + INTERVAL '1 hour' WHERE email = $2`;

        const values = [hashedToken, email];

        const result = await pool.query(query, values);

        return result.rowCount > 0; 
    };

    async reset(password, hashedToken) {
        const userQuery = `SELECT * FROM users WHERE reset_password_token = $1`;
        const userValues = [hashedToken]
        const userResult = await pool.query(userQuery, userValues);

        if (userResult.rows.length === 0) {
            throw new Error('Invalid or expired token.');
        }

        const user = userResult.rows[0];

        const expirationDate = user.reset_token_expiration;
        const currentDate = new Date();

        if (currentDate > expirationDate) {
            throw new Error('Reset link has expired.');
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        const updateQuery = `UPDATE users SET hashed_password = $1, reset_password_token = NULL, reset_token_expiration = NULL WHERE reset_password_token = $2`;
        const updateValues = [hashedPassword, hashedToken];

        await pool.query(updateQuery, updateValues);

        return { message: 'Password successfully reset.' };
    }
}

module.exports = new Method("user");