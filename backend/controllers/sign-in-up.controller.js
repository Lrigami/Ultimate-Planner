const authFunctions = require('../services/sign-in-up.service');

// Authentication and user controller
class Controller {
    constructor() {
        this.createNewUser = this.createNewUser.bind(this);
        this.getOneUser = this.getOneUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.login = this.login.bind(this);
        this.verifiyEmail = this.verifiyEmail.bind(this);
        this.forgotPassword = this.forgotPassword.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
    }

    async createNewUser(req, res) {
        try {
            const newUser = await authFunctions.createNewUser(req.body);
            res.status(201).json(newUser);
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }

    async getOneUser(req, res) {
        try {
            const oneUser = await authFunctions.getOneUser(req.params.id);
            if (!oneUser) return res.status(404).json({message: "User not found."});
            res.status(200).json(oneUser);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

    async updateUser(req, res) {
       try {
            const updatedUser = await authFunctions.updateUser(req.params.id, req.body);
            if (!updatedUser) return res.status(404).json({message: "user not found."});
            res.status(201).json(updatedUser);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

    async deleteUser(req, res) {
        try {
            const deletedUser = await authFunctions.deleteUser(req.params.id);
            if (!deletedUser) return res.status(404).json({message: "User not found."});
            res.status(200).json(deletedUser);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

    // authentication

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const token = await authFunctions.login(email, password);
            res.json({ token });
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    };

    async verifiyEmail(req, res) {
        try {
            const email = await authFunctions.verifiyEmail(req.body);
            if (!email) return res.status(404).json({message: "Email doesn't exist."});
            res.status(200).json(email);
        } catch (error) {
            res.status(error.status || 500).json({message: error.message});
        }
    }

    // password

    async forgotPassword(req, res) {
        try {
            const email = req.body.email;
            const EmailExist = await authFunctions.verifiyEmail(email);
            if (!EmailExist) await authFunctions.forgotPassword(email);
            res.status(200).json({message: 'Reset password email sent successfully.'});
        } catch (error) {
            res.status(error.status || 500).json({message: error.message});
        }
    }

    async resetPassword(req, res) {
        try {
            const newPassword = req.body.password;
            const token = req.params.token;
            await authFunctions.resetPassword(newPassword, token);
            res.status(200).json({message: 'Password was successfully reset.'});
        } catch (error) {
            res.status(error.status || 500).json({message: error.message});
        }
    }
}

module.exports = new Controller();