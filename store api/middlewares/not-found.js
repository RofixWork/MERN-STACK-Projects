const notFound = (req, res, next) => {
  return res
    .status(404)
    .json({ success: false, message: "this Route does not found" });
};
module.exports = notFound;
