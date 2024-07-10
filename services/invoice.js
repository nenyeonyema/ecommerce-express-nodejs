const invoicemodel = require('../schema/invoice.schema');

class InvoiceService {
    async createInvoice(Info) {
        // const newCat = await catmodel.create(catinfo) //this creates and saves, you will just return the saved cats
        const newInvoice = new invoicemodel(Info);
        const savedInvoice = await newInvoice.save();
        return savedInvoice;
    }
    async getAllInvoice() {
        // uses the find() method to get all documents/user/cats in the collection/table
        const allInvoice = await invoicemodel.find();
        return allInvoice;

    } async getOneInvoice(id) {
        // findone method finds a cat/user by any of the properties defined in the schema
        // and as well with the unique id's automatically assigned by mongo
        const foundInvoice = await invoicemodel.findOne({_id: id});
        return foundInvoice;
    }
    async updateOneInvoice(id, Info) {
        // findOneandUpdate method takes two parameters, that is the field to search or property
        // and the info to update, with the value new: true, returns only the 
        // updated value
        const updatedInvoice = await invoicemodel.findOneAndUpdate({_id: id}, Info, {new: true});
        return updatedInvoice;
    }
    async deleteOneInvoice(id) {
        const deletedOneInvoice = await invoicemodel.findOneAndDelete({_id: id})
        return deletedOneInvoice;
    }
}

const invoiceInstance = new InvoiceService();

module.exports = invoiceInstance;