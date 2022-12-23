// requires
require("dotenv").config();
require("express-async-errors");
const express = require("express");
const morgan = require("morgan");
const errorHandler = require("./middlewares/error-handler");
const notFound = require("./middlewares/not-found");
const userRouter = require("./routes/user.route");
const app = express();
// requires

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
}

app.use("/api/v1/", userRouter);

// my middlewares
app.use(notFound);
app.use(errorHandler);

// port
const PORT = process.env.PORT || 5000;

// start fn()
const start = async () => {
  try {
    app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
  } catch (error) {
    console.error(error);
  }
};
start();
