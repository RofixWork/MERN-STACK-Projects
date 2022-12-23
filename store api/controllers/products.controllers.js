const { geoSearch } = require("../models/product");
const Product = require("../models/product");
const getAllProductsStatic = async (req, res, next) => {
  const products = await Product.find({ price: { $gt: 30 } }).sort("price");

  res.status(200).json({ nbHits: products.length, products });
};

const getAllProducts = async (req, res, next) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (numericFilters) {
    const operators = {
      ">": "$gt",
      "<": "$lt",
      ">=": "$gte",
      "<=": "$lte",
      "=": "$eq",
    };

    const regex = /\b(<|>|<=|>=|=)\b/g;

    let filters = numericFilters.replace(regex, (match) => {
      return `-${operators[match]}-`;
    });
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((elem) => {
      const [field, operator, value] = elem.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: value };
      }
    });
  }

  console.log(queryObject);

  let result = Product.find(queryObject);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    result = result.select(fields.split(",").join(" "));
  }

  // if (limit) {
  //   result = result.limit(+limit);
  // }

  // if (skip) {
  //   result = result.skip(+skip);
  // }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const products = await result;

  res.json({ nbHits: products.length, products });
};
module.exports = { getAllProductsStatic, getAllProducts };
