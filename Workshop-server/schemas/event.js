const Joi = require('joi');

module.exports.validateEvent = (clientValues) => {
    const schema = Joi.object({
    })
    return schema.validate(eventValues);
}