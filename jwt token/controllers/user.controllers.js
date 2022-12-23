// requires
const Joi = require("joi");
const BadRequest = require("../errors/bad-request");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/custom-error");
// requires
const dashboard = async (req, res, next) => {
  res.status(200).json({
    message: `Hello ${req.user.username}, how are you?`,
    luckyNumber: `Here is your authorized data, your lucky number is ${Math.floor(
      Math.random() * 4000
    )}`,
  });
};

const login = async (req, res, next) => {
  // schema
  const schema = Joi.object({
    username: Joi.string().trim().lowercase().min(3).max(30).required(),
    password: Joi.string().trim().min(6).required(),
  });

  const { error, value } = schema.validate(req.body);
  //   check errors
  if (error) {
    throw new BadRequest(error.message);
  }

  //   create jwt
  const token = jwt.sign({ username: value.username }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  res.status(StatusCodes.OK).json({ token });
};
module.exports = { dashboard, login };
