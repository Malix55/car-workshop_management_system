const Joi = require('joi');

module.exports.validateAdminSignin = (admin) => {
    const schema = Joi.object({
        email: Joi.string().max(255).email().required(),
        password: Joi.string().max(255).required()
    })
    return schema.validate(admin);
}

module.exports.validateAdminSignup = (admin) => {
    const schema = Joi.object({
        name: Joi.string().max(255).required(),
        email: Joi.string().max(255).email().required(),
        password: Joi.string().min(6).max(255).required()
    })
    return schema.validate(admin);
}