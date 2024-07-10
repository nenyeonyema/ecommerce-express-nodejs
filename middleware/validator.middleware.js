// json body validation

const joiValidator = (schema, property = 'body') => {
    return (req, res, next) => {

        const { error } = schema.validate(req[property]);

        if (error) {
            return res.status(400).json({error: error.message});
        }
        next();
    }
}

module.exports = joiValidator;