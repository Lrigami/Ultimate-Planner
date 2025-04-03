const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMethods = require('../repositories/sign-in-up.repo');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const SECRET_KEY = process.env.SECRET_KEY;
const BASE_URL = "http://localhost:4200";

// Authentication and user services
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

    // Check if sign in form provided informations are correct
    async login(email, password) {
        // Check for email in db
        const user = await authMethods.getUserByEmail(email);
    
        if (!user) {
            const error = new Error('User not found');
            error.status = 401;
            throw error;
        }
    
        // Check for password in db
        const passwordMatch = await bcrypt.compare(password, user.hashed_password);
        if (!passwordMatch) {
            const error = new Error('Incorrect password');
            error.status = 401;
            throw error;
        }
    
        // User can be logged in for 24 hours
        return jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: '24h' });
    };

    async verifiyEmail(email) {
        return await authMethods.isEmailTaken(email);
    }

    // Password reset

    // Generate a random token for reset purposes (public token)
    generateResetToken() {
        return crypto.randomBytes(32).toString('hex');
    }

    // hash token to store it in db (private token)
    hashToken(token) {
        return crypto.createHash('sha256').update(token).digest('hex');
    }

    // Generate a url base on public token
    generateResetPasswordURL(token) {
        return `${BASE_URL}/resetpassword/${token}`;
    }

    // Send an email to user to reset password
    async sendResetEmail(userEmail, resetURL) {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS 
            }
        });
    
        const mailOptions = {
            from: '"Support" <noreply@ultimateplanner.com>',
            to: userEmail,
            subject: "Password reset",
            text: `Click on the link below to reset your password: ${resetURL}
            
            This link is valid during one hour.`,
            html: `<p>Click on the link below to reset your password:</p>
                   <a href="${resetURL}">${resetURL}</a>
                   <p>This link is valid during one hour.</p>`
        };
    
        try {
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error("Error sending mail :", error);
        }
    }

    // Steps when a user forget his password
    async forgotPassword(email) {
        // generate token
        const token = this.generateResetToken();
        const hashedToken = this.hashToken(token);
        await authMethods.storePasswordToken(email, hashedToken);
        // generate reset url
        const resetURL = this.generateResetPasswordURL(token);
        // send mail to user
        await this.sendResetEmail(email, resetURL);
        return {message: "Reset password email sent successfully."};
    }

    // To reset password 
    async resetPassword(password, token) {
        const hashedToken = this.hashToken(token);
        return await authMethods.reset(password, hashedToken);
    }
}

module.exports = new Functions();