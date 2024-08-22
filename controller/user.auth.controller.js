const userInstance = require('../services/user.auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const configVariables = require('../config/config');
const transporter = require('../config/mail.config');

const registerUser = async (req, res) => {
    try {
        const { firstname, lastname, password, email, role } = req.body;

        const user = await userInstance.findUserByEmail(email);
        if (user) {
            return res.status(400).json("User already exists");
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        const userDetails = {
            firstname,
            lastname,
            password: hashedPassword,
            role,
            email,
        };

        const newUser = await userInstance.createUser(userDetails);
        const token = jwt.sign({ id: newUser._id, email, role: newUser.role }, configVariables.JWT_TOKEN, { expiresIn: "2h" });

         const mailOptions = {
            from: configVariables.SMTP_USER,
            to: newUser.email,
            subject: 'Welcome to Our E-Commerce App!',
            text: `Hi ${firstname}, thank you for registering. Click the link below to login:\n\n${configVariables.CLIENT_URL}/login`
        };
        
        await transporter.sendMail(mailOptions);
        res.status(201).json({ message: "Registration Successful", token: token, user: newUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        console.log(req.body);

        const { email, password } = req.body;

        const user = await userInstance.findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        console.log(password, user.password)
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        
        const token = jwt.sign({ id: user._id, role: user.role }, configVariables.JWT_TOKEN, { expiresIn: "6days" });
        
        res.status(201).json({ message: "Login Successful", token: token, user: user });
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};

const getUserProfile = async (req, res) => {
    try {
        console.log(req.user._id);
        const user = await userInstance.findUserById(req.user._id);
        if (!user) {
            return res.status(403).json({ message: "Forbidden" });
        }
        
        res.status(200).json(user);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const user = await userInstance.findOneUpdate(req.user._id, req.body);

        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        res.status(201).json({ message: "User Updated Successfully", user_update: user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const deleteUserProfile = async (req, res) => {
    try {
        const deletedUser = await userInstance.findOneDelete(req.user._id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User Not Found" });
        }
        res.status(201).json({ message: "User Deleted Successfully", deletedUser: deletedUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userInstance.findUserByEmail(email);
        if(!user) {
            return res.status(404).json({message: "Email not found"});
        }

        const resetToken = jwt.sign({id: user._id, role: user.role, email }, configVariables.JWT_TOKEN, { expiresIn: "2days"});
        const resetLink = `${configVariables.CLIENT_URL}/reset-password/${resetToken}`;

        const mailOptions = {
            from: configVariables.SMTP_USER,
            to: email,
            subject: 'Password Reset Request',
            text: `You requested a password reset. Click the link below to reset your password:\n\n${resetLink}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({message: "Password reset link sent to your email"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
};


const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const decoded = jwt.verify(token, configVariables.JWT_TOKEN);
        const user = await userInstance.findUserById(decoded.id);

        if(!user) {
            return res.status(404).json({message: "User not found"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password reset successful. Redirecting to profile...", user: user });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
}

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUserProfile, resetPassword, forgotPassword };
