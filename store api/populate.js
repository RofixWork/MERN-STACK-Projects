require("dotenv").config();
const Product = require("./models/product");
const connectDB = require("./db/connect");
const products = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(products);
    console.log("success!!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
start();
