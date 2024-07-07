Packages for our application:
    express, 
    mongoose,  
    dotenv (package for environment variable)

Two types of validations
field validation
authentication check validation eg if you re logged in as the right user

Other packages to be installed:
    a. Middleware: formidable
    b. Nodemailer and Zoho enables us to send emails
    c. Zod is a validation package to validate your request body.


Zod is a middleware between the request route and the validation
next is controller which receives infos and check the necessary checks. Eg, Controller check eg if key value exist and if not throws an error. The controller is like the cpu and checks your models schema

Controller controls the routes
Note, your controller does not have access to the database
The controller will have to call the db model in service.
This is where you will handle your database services to findoneuser or to create a user

The application flow
request -> validation and authentication -> controller(routes) -> services(to) -> models -> db

cloudinary: an online file storage system, upload your files to cloudinary and it returns  url string. Similar to AWS S3

Study Validation packages jpy and yum
create a paystack account and a zoho account

for experiment: genny id: 6673580fd1fd632a90f22225, chinenyeid: 6673573cd1fd632a90f22223
http://localhost:8080/category/create

joi Validation
npm install express-joi-validate --save
OR
yarn add express-joi-validate --save

// assign
complete the crud category and the product, add the validation, upload a product image

Multer is a nodejs middleware used for uploading images
npm install multer --save

EJS (Embedded Javascript) is a templating engine for nodejs. This engine helps to create an HTML page via templates with minimal code.
npm install ejs --save

The module “body-parser” enables reading (parsing) HTTP-POST data.
npm install body-parser --save

Note: we do payment in our ecommerce and email sending.

cloudinary and formidable
User schema, signup, login (authentication), middleware routes with formidable, upload with cloudinary

User Authentication
1. check if the user exist,  user info contains a unique key in most time we use email for unique key s no two person has the same email.
2. the password has to be hashed i.e encoding
3. Using packages like 
4. Hooks in mongodb using presaved hooks i.e before a detail is saved, makes sure it hashed. we can use either argon or bcrypt to hash the password.

5. check password

Authorization protects the route, ie.e if a user has permision to hit a route. we use jsonwebtoken(the jwbt token is coined out of the user details like the user id) as this token has an expiry time

Blog should have a name of blog, author(user), title, content/description, 
Their should be a relationship between usermodel and the blog model. do a complete CRUD
create a user, create signup and signin.