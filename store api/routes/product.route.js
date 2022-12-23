const express = require("express");
const {
  getAllProducts,
  getAllProductsStatic,
} = require("../controllers/products.controllers");
const productRouter = express.Router();

productRouter.route("/static").get(getAllProductsStatic);
productRouter.route("/").get(getAllProducts);

module.exports = productRouter;
