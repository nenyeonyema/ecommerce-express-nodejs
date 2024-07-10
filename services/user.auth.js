const usermodel = require('../schema/user.schema');

class UserService {
    async createUser(info) {
        const newUser = new usermodel(info);
        const savedUser = await newUser.save();
        return(savedUser);
    }

    async findAllUsers() {
        const users = await usermodel.find();
        return users;
    }
    async findUserById(id) {
        const foundUser = await usermodel.findOne({_id: id}); //.select('-password')
        return foundUser;
    }

    async findUserByEmail(email) {
        const foundUser = await usermodel.findOne({email: email});
        return foundUser;
    }

    async findOneUpdate(id, info) {
        const updatedUser = await usermodel.findOneandUpdate({_id: id}, info, {new: true}); //.select('-password')
        return updatedUser;
    }

    async findOneDelete(id) {
        const deletedUser = await usermodel.findOneAndDelete({_id: id});
        return deletedUser;
    }
}

const userInstance = new UserService();

module.exports = userInstance;