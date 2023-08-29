exports.requestValidator = (schema) => async (req, res, next) => {
  try {
    await schema.validate(
      {
        body: req.body,
        query: req.query,
        params: req.params,
      },
      { abortEarly: false }
    );
    return next();
  } catch (error) {
    return res.status(500).json({ type: error.name, errors: error.errors });
  }
};
