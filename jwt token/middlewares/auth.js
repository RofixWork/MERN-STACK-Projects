const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/custom-error");
const authenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomError("no token provided", StatusCodes.UNAUTHORIZED);
  }

  const token = authHeader.split(/\s/).at(1);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { username: decoded.username };
    console.log(decoded);
    next();
  } catch (error) {
    throw new CustomError("Unauthorized!", StatusCodes.UNAUTHORIZED);
  }
};

module.exports = authenticated;
