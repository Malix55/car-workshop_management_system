const Joi = require('joi');

module.exports.validateClient = (clientValues) => {
    const schema = Joi.object({
        firstName: Joi.string().max(255).required(),
        lastName: Joi.string().max(255).required(),
        email: Joi.email().string().max(255).required(),
        address: Joi.string().required(),
        operationalArea: Joi.string().required(),
        idstring: Joi.string().required(),
        education: Joi.string().required(),
        country: Joi.string().required(),
        state: Joi.string().required(),
        experience: Joi.string().required(),
        skills: Joi.string().required(),
        phoneNumber: Joi.number().required(),
        additionalDetails: Joi.string().required(),
        
    })
    return schema.validate(clientValues);
}