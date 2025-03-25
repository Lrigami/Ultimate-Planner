const authFunctions = require('../services/sign-in-up.service');

class Controller {
    constructor() {
        this.createNewUser = this.createNewUser.bind(this);
        this.getOneUser = this.getOneUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
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
            if (!oneUser) return res.status(404).json({message: "User not Found."});
            res.status(200).json(oneUser);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

    async updateUser(req, res) {
       try {
            const updatedUser = await authFunctions.updateUser(req.params.id, req.body);
            if (!updatedUser) return res.status(404).json({message: "user not Found."});
            res.status(201).json(updatedUser);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

    async deleteUser(req, res) {
        try {
            const deletedUser = await authFunctions.deleteUser(req.params.id);
            if (!deletedUser) return res.status(404).json({message: "User not Found."});
            res.status(200).json(deletedUser);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }
}

module.exports = new Controller();