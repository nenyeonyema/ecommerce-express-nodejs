const productModel = require('../schema/product.schema');

class ProductService {
    async createProduct(productInfo) {
        // const product = new productModel(productInfo);
        // const savedProduct = await product.save(); OR
        const savedProduct = await productModel.create(productInfo);
        return savedProduct;
    }
    async findAllProducts() {
        // const allProducts = await productModel.find();
        const allProducts = await productModel.find().populate('categoryId');
        return allProducts;
    }
    async findOneProduct(id) {
        const foundOneProduct = await productModel.findOne({_id: id}).populate('categoryId');
        return foundOneProduct;
    }
    async findAndUpdateOneProduct(id, productInfo) {
        const updatedAProduct = await productModel.findOneAndUpdate({_id: id}, productInfo, {new: true}).populate('categoryId');
        return updatedAProduct;
    }
    async deleteOneProduct(id) {
        const deletedAProduct = await productModel.findOneAndDelete({_id: id});
        return deletedAProduct;
    }
}

const productInstance = new ProductService();
module.exports = productInstance;