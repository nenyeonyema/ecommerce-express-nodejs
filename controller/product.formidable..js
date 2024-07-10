
const productInstance = require('../services/product.service');
const catInstance = require('../services/cat.service');
const formidable = require('formidable');

const createProduct = async (req, res, next) => {

    const { name, description, price, quantity, isPurchased, categoryId, imgUrl } = req.body;
    try {
        
        // const category = await catInstance.findOneCat({_id: categoryId});
        const category = await catInstance.findeOneCat(categoryId);
        if(!category) {
            res.status(400).json("category not found");
        }
        const newUpdate = {
            name,
            description,
            price,
            quantity,
            isPurchased,
            categoryId: category._id,
            imgUrl: imgUrl ?? ''  
        }

        const createdProduct = await productInstance.createProduct(details);
        res.status(200).json(createdProduct);
    }
    catch(error) {
        console.log(error);
        throw new Error(error);
    }
    // to access data we use the field, the request 
}

const updateOneProduct = async (req, res) => {
    const { name, description, price, quantity, isPurchased, categoryId, imgUrl } = req.body;
    try {
        const { id } = req.params;
        
        // const category = await catInstance.findOneCat({_id: categoryId});
        const category = await catInstance.findeOneCat(categoryId);
        if(!category) {
            res.status(400).json("category not found");
        }
        const newUpdate = {
            name,
            description,
            price,
            quantity,
            isPurchased,
            categoryId: category._id,
            imgUrl: imgUrl ?? ''  
        }

        const updatedAProduct = productInstance.findAndUpdateOneProduct(id, newUpdate);
        res.status(200).json(updatedAProduct);
    }
    catch(error) {
        console.log(error);
        throw new Error(error);
    }
}

// const updateOneProduct = async (req, res) => {
//     const { name, description, price, quantity, isPurchased, categoryId, imgUrl } = req.body;
//     try {
//         const { id } = req.params;
        
//         // const category = await catInstance.findOneCat({_id: categoryId});
//         const category = await catInstance.findeOneCat(categoryId);
//         if(!category) {
//             res.status(400).json("category not found");
//         }
//         const newUpdate = {
//             name,
//             description,
//             price,
//             quantity,
//             isPurchased,
//             categoryId: category._id,
//             imgUrl: imgUrl ?? ''  
//         }

//         const updatedAProduct = productInstance.findAndUpdateOneProduct(id, newUpdate);
//         res.status(200).json(updatedAProduct);
//     }
//     catch(error) {
//         console.log(error);
//         throw new Error(error);
//     }
// }
