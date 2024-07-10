const userInstance = require('../services/user.auth');
const { validateUser } = require('../joiSchema/user.schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const verifyToken = require('../utilities/jwt');
const configVariables = require('../config/config');

const registerUser = async (req, res) => {
    try {
    
        // const { error } = validateUser(req.body);
        // if (error) {
        //     return res.status(400).json({ message: error.details[0].message });
        // }

        const { firstname, lastname, password, email } = req.body;

        const user = await userInstance.findUserByEmail(email);

        if(user) {
            return res.status(400).json("user already exist");
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        const userDetails = {
            firstname,
            lastname,
            password: hashedPassword,
            email,
        }

        const newUser = await userInstance.createUser(userDetails);
        
        const token = jwt.sign({id: newUser._id, email}, configVariables.JWT_TOKEN, { expiresIn: "2h"});

        res.status(201).json({message: "Registration Successful", token: token, user: newUser});
        // res.status(201).json(newUser);

    }
    catch(error) {
        console.log(error);
        res.status(500).json({message: error.message});
        // throw new Error(error);
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userInstance.findUserByEmail(email);

        if(!user) {
            return res.status(401).json("Invalid email and password");
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) {
            return res.status(401).json({message: "Invalid password"});
        }

        const token = jwt.sign({user_id: user._id}, configVariables.JWT_TOKEN, { expiresIn: "2h"});
        
        res.status(201).json({message: "Login Successful", token: token, user: user})
    }
    catch(error) {
        return res.status(500).json({message: "Error logging in"});
    }
}

const getUserProfile = async(req, res) => {
    try {
        const user = await userInstance.findUserById(req.user._id);

        if(!user) {
            res.status(403).json({message: "Forbidden"});
        }
        res.json(user);
    }
    catch(error) {
        console.log(error)
        res.status(500).json({message: error.message});
    }
}

const updateUserProfile = async(req, res) => {
    try {
        const user = await userInstance.findOneUpdate(req.user._id, req.body);

        if(!user) {
            res.status(404).json({message: "User Not Found"});
        }

        res.status(201).json({message: "User Updated Successfully", user_update: user});
    }
    catch(error) {
        console.log(error)
        res.status(500).json({message: "Sever Error"});
    }
}

const deleteUserProfile = async(req, res) => {
    try {
        const deletedUser = await userInstance.findOneDelete(req.user._id);
        if (!deletedUser) {
            res.status(404).json({message: "User Not Found"});
        }
        res.status(201).json({message: "User Deleted Successfully", deletedUser: deletedUser});
    }
    catch(error) {
        console.log(error)
        res.status(500).json({message: "Sever Error"});
    }
}

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUserProfile};