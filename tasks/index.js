const express = require("express");
const morgan = require("morgan");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
const taskRouter = require("./routes/tasks.route");
require("dotenv").config();
const app = express();
app.use(express.json());

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
}

app.use("/api/v1/tasks", taskRouter);

app.use(notFound);
app.use(errorHandler);

// port number
const PORT = process.env.PORT || 5000;
// start
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
  } catch (error) {
    console.error(error);
  }
};
start();
