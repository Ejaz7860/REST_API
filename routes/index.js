const express = require("express");
const router = express.Router();

const {
    postProduct,
    getProducts
} = require("../controllers/ProductList");

const { userRegister, userLogin } = require("../controllers/Users");

router.route("/products").post(postProduct).get(getProducts)
// router.route("/products").get(getProductDetails);
router.route("/singUp").post(userRegister);
router.route("/Login").post(userLogin);

module.exports = router;
