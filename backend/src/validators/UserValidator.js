const Joi = require('joi');

const userRegisterationValidationSchema = Joi.object({
    email: Joi.string()
        .min(6)
        .max(256)
        .email()
        .required(),
    password: Joi.string()
        .min(6)
        .max(128)
        .required(),
    course: Joi.string()
        .min(2)
        .max(64)
        .required()
        .uppercase(),
});

const userLoginValidationSchema = Joi.object({
    email: Joi.string()
        .min(6)
        .max(256)
        .email()
        .required(),
    password: Joi.string()
        .min(6)
        .max(128)
        .required(),
});

module.exports.userRegValidator = (data) =>
    userRegisterationValidationSchema.validate(data, { convert: true });

module.exports.userLoginValidator = (data) =>
    userLoginValidationSchema.validate(data);