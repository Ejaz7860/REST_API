const express = require('express');
const router = express.Router();

const {  getProductDetails, userRegister, uploadImg, postProduct } = require('../controllers/ProductList')


router.route('/products').post(uploadImg, postProduct);

router.route('/products').get(getProductDetails)

router.route('/singUp').post(userRegister)
module.exports = router