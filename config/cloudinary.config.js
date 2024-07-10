//Importing libraries 
const cloudinary = require("cloudinary"); 
const dotenv = require("dotenv");

dotenv.config();

/* 
The way that we have set up the Cloudinary config method is to 
insert an object that contains the cloud_name, api_key and api_secret.  
Because all of this is sensitive information, it's not advisable adding
the configuration as plain text which is how the dotenv tool will aid 
in the process. It can use the environment tables to find the information 
by adding a .env file into the root directory along with this code.
*/
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
}); 

exports.uploads = (file, folder) =>{
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) =>{
            resolve({
                url: result.url, 
                id: result.public_id

            }, {
                resource_type: "auto", 
                folder: folder
            })
        })
    })
}
