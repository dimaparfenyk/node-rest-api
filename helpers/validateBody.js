const HttpError = require("./HttpError");

const validateBody = (schema, data) => {
  const { error } = schema.validate(data);

  if (error) {
    throw HttpError(400, error.message);
  }
};

module.exports = validateBody;
