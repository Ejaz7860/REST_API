const express = require('express');
const router = express.Router();

const {  getProductDetails, uploadImg, postProduct } = require('../controllers/ProductList')

const { userRegister, userLogin }  = require('../controllers/Users');


router.route('/products').post(uploadImg, postProduct);

router.route('/products').get(getProductDetails)

router.route('/singUp').post(userRegister)
router.route('/Login').post(userLogin)

module.exports = router