const { CustomApiError } = require("../customErrors/custom-error");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomApiError) {
    return res.status(err.status).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "something went wrong, please try again",
  });
};

module.exports = errorHandler;
