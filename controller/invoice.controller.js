// Controls the request and response
// imports the methods from the services folder that creates, finds etc
const invoiceInstance = require('../services/invoice');

const createInvoice = async (req, res) => {
    try {
        const data = req.body;
        const createdInvoice = await invoiceInstance.createInvoice(data);
        res.json(createdInvoice);
    }
    catch(error) {
        throw new Error (error);
    }
}
const getAllInvoice = async (req, res) => {
    try {
        const getAll = await invoiceInstance.getAllInvoice();
        res.json(getAll);
    }
    catch(error) {
        throw new Error(error);
    }
}
const getOneInvoice = async (req, res) => {
    try {
        const idParams = req.params.id;
        const oneInvoice = await invoiceInstance.getOneInvoice(idParams);
        res.json(oneInvoice);
    }
    catch(error) {
        throw new Error(error);
    }
}
const updateOneInvoice = async (req, res) => {
    try{
        const { id } = req.params;
        const data = req.body;
        const updatedOneInvoice = await invoiceInstance.updateOneInvoice(id, data);
        res.json(updatedOneInvoice);
    }
    catch(error) {
        console.log(error);
        throw new Error(error);
    }
}

const deleteOneInvoice = async (req, res) => {
    try {
        const { id } = req.params.id;
        const deletedOneInvoice = await invoiceInstance.deleteOneInvoice(id);
        console.log(deletedOneInvoice);
        res.status(200).json(deletedOneInvoice);
    }
    catch(error) {
        console.log(error);
        throw new Error(error.message);
    }
}

module.exports = { createInvoice, getAllInvoice, getOneInvoice, updateOneInvoice, deleteOneInvoice };