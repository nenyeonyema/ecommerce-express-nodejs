const productInstance = require('../services/product.service');
const catInstance = require('../services/cat.service');
const formidable = require('formidable');
const { updateValidator } = require('../joiSchema/update.schema');
const uploadFile = require('../utilities/upload.util');

const createProduct = async (req, res, next) => {
    // destructures the vody of the body of the request

    const form = formidable({maxFieldsSize: 400});
 
    form.parse(req, async (err, fields, files) => {
        if(err) {
            throw next(err);
        }
        // console.log(file['imgUrl'], 'filename');

        const { name, description, price, quantity, isPurchased, categoryId } = fields;
        const imgUrl = files.imgUrl; // Assuming 'imgUrl' is the field name for the file input
        
        // console.log(files['imgUrl'].fields);
        console.log(imgUrl);

        console.log('Fields:', fields);
        console.log('Files:', files);

        // Manually validates the fields without joi, which means it won't be passed in the route since the fields will be validated within the body of the function
        if(!name || !description || !price || !quantity || !isPurchased || !categoryId || !imgUrl) {
            return res.status(500).json('Details not complete')
        }
        
        const { secure_url } = await uploadFile(files['imgUrl'].filepath, 'intro');
        // const { secure_url } = await uploadFile(imgUrl, 'intro');
        
        const category = await catInstance.findeOneCat({_id: categoryId});

        // checks if category returned the found object and it does'nt throws an error
        if(!category) {
            throw res.status(404).json('Category not found')
        }
        const details = {
                name,
                description,
                price,
                quantity,
                isPurchased,
                categoryId: category._id,
                imgUrl: secure_url
            }
        const createdProduct = await productInstance.createProduct(details);
        res.status(200).json(createdProduct);

        // res.json({field, file});
    });
    
}

const findAllProducts = async (req, res) => {
    try {
        const allProducts = await productInstance.findAllProducts();
        res.status(200).json(allProducts);
    }
    catch(error) {
        console.log(error);
        throw new Error(error);
    }
}

const findOneProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const foundOneProduct = await productInstance.findOneProduct(id);
        res.status(200).json(foundOneProduct);
    }
    catch(error) {
        console.log(error);
        throw new Error(error);
    }
}

const updateOneProduct = async (req, res) => {

    const form = formidable({maxFieldsSize: 400});
 
    const { id } = req.params;
    
    form.parse(req, async (err, fields, files) => {
        if(err) {
            throw next(err);
        }

        // calls the required joi form validator to validate fields. This wont be passed in the route since it is validated within the function body
        const { error } = updateValidator(fields);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { name, description, price, quantity, isPurchased, categoryId } = fields;
        const imgUrl = files.imgUrl;
        

        const { secure_url } = await uploadFile(files['imgUrl'].filepath, 'intro');
        
        const category = await catInstance.findeOneCat({_id: categoryId});

        if(!category) {
            throw res.status(404).json('Category not found')
        }

        // updated details with optional inputs
        const newUpdate = {
            ...(name && { name }),
            ...(description && { description }),
            ...(price && { price }),
            ...(quantity && { quantity }),
            ...(isPurchased && { isPurchased }),
            categoryId: category._id,
            imgUrl: secure_url
        }

        const updatedAProduct = productInstance.findAndUpdateOneProduct(id, newUpdate);
        res.status(200).json(updatedAProduct);
    });
    
}

const deleteOneProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAProduct = await productInstance.deleteOneProduct(id);
        if(!deletedAProduct) {
            res.status(404).json('Product not found')
        }
        res.status(200).json(deletedAProduct);
    }
    catch(error) {
        console.log(error);
        throw new Error(error);
    }
}

module.exports = {createProduct, findAllProducts, findOneProduct, updateOneProduct, deleteOneProduct}