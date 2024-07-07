// Controls the request and response
// imports the methods from the services folder that creates, finds etc
const catInstance = require('../services/cat.service');

const createCat = async (req, res) => {
    try {
        const data = req.body;
        const createdCat = await catInstance.createCat(data);
        res.json(createdCat);
    }
    catch(error) {
        throw new Error (error);
    }
}
const findAllCats = async (req, res) => {
    try {
        const findAll = await catInstance.findAllCats();
        res.json(findAll);
    }
    catch(error) {
        throw new Error(error);
    }
}
const findOneCat = async (req, res) => {
    try {
        const idParams = req.params.id;
        const oneCat = await catInstance.findeOneCat(idParams);
        res.json(oneCat);
    }
    catch(error) {
        throw new Error(error);
    }
}
const updateOneCat = async (req, res) => {
    try{
        const { id } = req.params;
        const data = req.body;
        const updatedOneCat = await catInstance.updateOneCat(id, data);
        res.json(updatedOneCat);
    }
    catch(error) {
        console.log(error);
        throw new Error(error);
    }
}

const deleteOneCat = async (req, res) => {
    try {
        const { id } = req.params.id;
        const deletedOneCat = await catInstance.deleteOneCat(id);
        console.log(deletedOneCat);
        res.status(200).json(deletedOneCat);
    }
    catch(error) {
        console.log(error);
        throw new Error(error.message);
    }
}

module.exports = { createCat, findAllCats, findOneCat, updateOneCat, deleteOneCat }