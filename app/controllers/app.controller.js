
const myProduct = require("../model/app.model.js");

// Create and Save a new product
exports.create = (req, res) => {
  const product = new myProduct({
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    productPrice: req.body.productPrice,
  });
  product
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the product.",
      });
    });
};

// Retrieve all product from the database.
exports.findAll = (req, res) => {
  myProduct.find()
    .then((data) => {
      if (!data) {
        return res.send({
          message: 'No product available',
        })
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving product.",
      });
    });
};

// Find a single product with a productId
exports.findOne = (req, res) => {
  myProduct.findById(req.params.productId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "product not found with id " + req.params.productId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "product not found with id " + req.params.productId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving product with id " + req.params.productId,
      });
    });
};

// Update a product identified by the productId in the request
exports.update = (req, res) => {
  myProduct.findByIdAndUpdate(
    req.params.productId,
    {
      productName: req.body.productName,
    },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "product not found with id " + req.params.productId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "product not found with id " + req.params.productId,
        });
      }
      return res.status(500).send({
        message: "Error updating product with id " + req.params.productId,
      });
    });
};

// Delete a product with the specified productId in the request
exports.delete = (req, res) => {
  myProduct.findByIdAndRemove(req.params.productId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "product not found with id " + req.params.productId,
        });
      }
      res.send({ message: "product deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "product not found with id " + req.params.messageId,
        });
      }
      return res.status(500).send({
        message: "Could not delete product with id " + req.params.messageId,
      });
    });
};
