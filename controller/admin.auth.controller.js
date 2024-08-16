const userInstance = require('../services/user.auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const configVariables = require('../config/config');

const getAllUsers = async (req, res) => {
    try {
        const users = await userInstance.findAllUsers({ role: 'user' });
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error occurred while fetching users" });
    }
};

const getOneUser = async (req, res) => {
    try {
        const user = await userInstance.findUserById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error occurred while fetching the user" });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await userInstance.findOneUpdate(req.params.id, req.body);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: "User updated successfully", user_update: user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error occurred while updating the user" });
    }
};

const deleteUser = async (req, res) => {
    try {
        const deletedUser = await userInstance.findOneDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully", deletedUser: deletedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error occurred while deleting the user" });
    }
};

module.exports = { getAllUsers, getOneUser, updateUser, deleteUser };
