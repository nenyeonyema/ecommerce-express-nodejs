const catmodel = require('../schema/category.schema');

class CatService {
    async createCat(catInfo) {
        // const newCat = await catmodel.create(catinfo) //this creates and saves, you will just return the saved cats
        const newCat = new catmodel(catInfo);
        const savedCat = await newCat.save();
        return savedCat;
    }
    async findAllCats() {
        // uses the find() method to get all documents/user/cats in the collection/table
        const allCats = await catmodel.find();
        return allCats;

    } async findeOneCat(id) {
        // findone method finds a cat/user by any of the properties defined in the schema
        // and as well with the unique id's automatically assigned by mongo
        const foundCat = await catmodel.findOne({_id: id});
        return foundCat;
    }
    async updateOneCat(id, catInfo) {
        // findOneandUpdate method takes two parameters, that is the field to search or property
        // and the info to update, with the value new: true, returns only the 
        // updated value
        const updated = await catmodel.findOneAndUpdate({_id: id}, catInfo, {new: true});
        return updated;
    }
    async deleteOneCat(id) {
        const deletedACat = await catmodel.findOneAndDelete({_id: id})
        return deletedACat;
    }
}

const catInstance = new CatService();

module.exports = catInstance;