const cloudinary = require('cloudinary').v2;

const uploadFile = async (filepath, folder='') => {
    const result = await cloudinary.uploader.upload(filepath, {
        resource_type: 'auto', // this auto takes in any file format
        folder: folder // this is the folder where the files will be stored in cloudinary
    });
    return result;
}

module.exports = uploadFile;

