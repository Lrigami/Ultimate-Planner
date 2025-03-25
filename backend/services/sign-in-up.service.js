const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMethods = require('../repositories/sign-in-up.repo');

const SECRET_KEY = process.env.SECRET_KEY;

class Functions {
    async createNewUser(userData) {
        return await authMethods.create(userData);
    }

    async getOneUser(userId) {
        return await authMethods.getone(userId);
    }

    async updateUser(userId, userData) {
        return await authMethods.update(userId, userData);
    }

    async deleteUser(userId) {
        return await authMethods.delete(userId);
    }

    async login(email, password) {
        const user = await authMethods.getUserByEmail(email);
    
        if (!user) {
            const error = new Error('User not found');
            error.status = 401;
            throw error;
        }
    
        const passwordMatch = await bcrypt.compare(password, user.hashed_password);
        if (!passwordMatch) {
            const error = new Error('Incorrect password');
            error.status = 401;
            throw error;
        }
    
        return jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: '24h' });
    };
}

module.exports = new Functions();