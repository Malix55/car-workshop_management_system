const Joi = require('joi');

module.exports.validateProduct = (clientValues) => {
    const schema = Joi.object({
        name: Joi.string().max(255).required(),
        type: Joi.string().max(255).required(),
        brand: Joi.string().max(255).required(),
        retailprice: Joi.number().required(),
        saleprice: Joi.number().required(),
        quantity: Joi.number().required(),
        make: Joi.string().required(),
        model: Joi.string().required(),
        part_ID: Joi.string().required(),
        modelYear: Joi.string().required(),
        weight: Joi.number().required(),
        quality: Joi.string().required(),
        description: Joi.string().required(),
        
    })
    return schema.validate(clientValues);
}