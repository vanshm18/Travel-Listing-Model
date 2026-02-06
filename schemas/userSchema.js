const Joi= require("joi");

const registerSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    name: Joi.string().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.any().equal(Joi.ref("password")).required()
        .messages({ "any.only": "Passwords do not match" })
});

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});

module.exports = { registerSchema, loginSchema };
