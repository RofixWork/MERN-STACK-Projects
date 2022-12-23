const notFound = (req, res, next) => {
  res.status(404).json({
    status: false,
    message: "Route does not found",
  });
};

module.exports = notFound;
