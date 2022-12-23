// import
const { createCustomError } = require("../customErrors/custom-error");
const asyncWrapper = require("../middleware/async");
const Task = require("../models/Task");
const taskSchema = require("../schema/task.schema");
// import

// get all Tasks
const getAllTasks = asyncWrapper(async (req, res, next) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

// get Task
const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: { $eq: taskId } });

  if (!task)
    return next(createCustomError(`No Task with id => ${taskId}`, 404));

  res.status(200).json({ task });
});

// create Task
const createTask = asyncWrapper(async (req, res, next) => {
  const { error, value } = taskSchema().validate(req.body);

  if (error)
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  const task = await Task.create(value);
  res.status(201).json({ task });
});

// delete Task
const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: { $eq: taskId } });

  if (!task) {
    return next(createCustomError(`No Task with id => ${taskId}`, 404));
  }

  res.status(200).json({ task });
});

// update Task
const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  // validate body
  const { error, value } = taskSchema().validate(req.body);
  // error
  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }

  const task = await Task.findOneAndUpdate(
    { _id: { $eq: taskId } },
    { ...value },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!task) {
    return next(createCustomError(`No Task with id => ${taskId}`, 404));
  }

  res.status(200).json({ task });
});
module.exports = { getAllTasks, getTask, updateTask, deleteTask, createTask };
