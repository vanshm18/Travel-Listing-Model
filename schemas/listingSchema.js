const joi = require("joi");

const listingSchema = joi.object ({
        title: joi.string().required(),
        image: joi.string().allow("",null),             // null value allowed as mongodb is storing a default value incase of null.
        description: joi.string().required(),
        price: joi.number().required().min(0),          // minimum value 0 (not negative numbers)
        location: joi.string().required(),
        country: joi.string().required(),
    }).required();

module.exports = listingSchema;