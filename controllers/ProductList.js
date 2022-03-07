const Products = require("../model/Products");

postProduct = async (req, res, next) => {
  let product = new Products({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
  });

  product
    .save()
    .then((data) => {
      res.send({
        success: true,
        message: "Product successfully created",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: err.message || "Some error occured",
      });
    });
};

// getProducts

getProducts = async (req, res) => {
  try {

    const productCount = await Products.countDocuments();
    let Product = Products.find()
    Product.then((product) => {
      res.status(200).json({
        success: true,
        productCount,
        product
      });
    });
  } catch (error) {
    res.status(404).send({ message: "Not FOund" });
  }
};

module.exports = {
  postProduct,
  getProducts,
};
