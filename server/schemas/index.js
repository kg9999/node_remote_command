'use strict'

const Joi = require('joi');

const validateCommandPost = (req, res, next) => {
    const schema = Joi.object({
        command: Joi.string().required(),
        arguments: Joi.array().required(),
        host: Joi.string().required(),
    });
    const options = {
        abortEarly: false,
        allowUnknown: true, 
        stripUnknown: true 
    };
    const { error, value } = schema.validate(req.body, options);

    if (error) {
        return res.send(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    } 
    req.body = value;
    next();
}

module.exports = {
    validateCommandPost: validateCommandPost
}