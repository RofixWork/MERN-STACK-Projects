const errorHandler = (err, req, res, next) => {
  console.log(err);
  return res.status(500).json({
    success: false,
    message: `Something is wrong, please try again`,
  });
};
module.exports = errorHandler;
