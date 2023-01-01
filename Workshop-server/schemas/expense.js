const Joi = require('joi');

module.exports.validateExpense = (clientValues) => {
    const schema = Joi.object({
               
    })
    return schema.validate(clientValues);
}