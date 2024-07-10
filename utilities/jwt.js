// const jwt = require("jsonwebtoken");

// const config = process.env;

// const verifyToken = (req, res, next) => {
//   const token =
//     req.body.token || req.query.token || req.headers["x-access-token"];

//   if (!token) {
//     return res.status(403).send("A token is required for authentication");
//   }
//   try {
//     const decoded = jwt.verify(token, config.TOKEN_KEY);
//     req.user = decoded;
//   } catch (err) {
//     return res.status(401).send("Invalid Token");
//   }
//   return next();
// };

// const token = (user_id, configVariablesJWT_TOKEN) => {
//     return jwt.sign({userId: user_id}, configVariables.JWT_TOKEN, { expiresIn: "2h"});

// }

// module.exports = token;