const mongoose = require("mongoose");

const AppSchema = mongoose.Schema({
  productName: String,
  productDescription: String,
  productPrice: String,
},
  { versionKey: false 
  },
  {timestamps: true}
);

module.exports = mongoose.model("Products", AppSchema, "Products");
