const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    price: {
      type: Number,
      required: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      enum: {
        values: ["liddy", "marcos", "ikea", "caressa"],
        message: "{VALUE} is not supported",
      },
    },
    featured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 4.5,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
