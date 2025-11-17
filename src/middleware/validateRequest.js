function validateRequest(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const details = error.details.map((detail) => detail.message);
      return res.status(422).json({ message: 'Invalid request body', details });
    }

    req.validatedBody = value;
    return next();
  };
}

module.exports = validateRequest;
