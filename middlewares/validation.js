const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    if (Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ status: "error", code: 400, message: "missing fields" });
    }
    next();
  } catch (err) {
    return res
      .status(400)
      .json({ status: "error", code: 400, message: err.message });
  }
};

module.exports = { validateBody };
