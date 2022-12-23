const Joi = require("joi");

const taskSchema = () => {
  const schema = Joi.object({
    name: Joi.string().trim().lowercase().max(20).required(),
    completed: Joi.boolean(),
  });

  return schema;
};
module.exports = taskSchema;
