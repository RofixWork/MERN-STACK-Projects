// requires
require("dotenv").config();
require("express-async-errors");
const express = require("express");
const morgan = require("morgan");
const connectDB = require("./db/connect");
const errorHandler = require("./middlewares/error-handler");
const notFound = require("./middlewares/not-found");
const productRouter = require("./routes/product.route");
// requires

// app
const app = express();

app.use(express.json());

// morgan
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
}

app.get("/", (req, res) => {
  res.status(200).send(`
        <div style='font-family:"Arial"'>
            <h1>Store Api</h1>
            <a href='/api/v1/products'>Products Name</a>
        </div>
    `);
});

// product route
app.use("/api/v1/products", productRouter);

// middlewares
app.use(notFound);
app.use(errorHandler);
// port
const PORT = process.env.PORT || 5000;
// start fn()
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};
start();
