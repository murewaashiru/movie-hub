require('@hapi/joi');

module.exports = async (schema, toValidate, res, next) => {
  try {
    await schema.validateAsync(toValidate);
    next();
  } catch (error) {
    return res.status(422).json({
      status: 422,
      message: error.message,
      error: 'Validation Error',
    });
  }
};
