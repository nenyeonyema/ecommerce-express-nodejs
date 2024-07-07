//Imported the multer package
const multer = require("multer");

//assigning the uploads folder to DIR
const DIR = "./uploads"
/* 
Using uploads directory for the storage configuration of the files 
received by multer,
*/
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR)
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toIS0String() + '-' + file.orginalname)
    }
});

const fileFilter =  (req, file, cb ) =>{
    if(file.mimetype === "image/jepg" || file.mimetype === 'image/png'){
        cb(null, true)
    } else {
        //reject file 
        cb({message: "Unsupported file format"}, false)
    }
}

const upload = multer({
    storage:storage, 
    limits:{fileSize: 1024 * 1024}, 
    fileFilter:fileFilter
})

module.exports = upload;