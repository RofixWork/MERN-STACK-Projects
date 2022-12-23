class CustomApiError extends Error {
  constructor(msg, statusCode) {
    super(msg);
    this.status = statusCode;
  }
}

const createCustomError = (msg, statusCode) => {
  return new CustomApiError(msg, statusCode);
};
module.exports = { createCustomError, CustomApiError };
