// middleware/validate.js
const validate = (schema) => {
  return (req, res, next) => {
    let { error } = schema.validate(req.body);
    if (error) {
      return next({
        status: 400,
        message: error.details[0].message,
        extra: error.details
      });
    }
    next();
  };
};

module.exports = validate;
