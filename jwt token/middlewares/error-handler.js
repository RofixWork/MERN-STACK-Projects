const CustomError = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");
const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.status).json({
      status: false,
      message: err.message,
    });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: false,
    message: "Something went wrong, please try again",
  });
};

module.exports = errorHandler;
