
const multer = require("multer");
const Product = require("../model/Products");
const user = require("../model/User");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './uploads');
    },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
});

const uploadImg = multer({storage: storage}).single('image');


postProduct = async (req, res, next) => {

  Product.findOne({ title: req.body.title }, (err, data) => {

    //if tea not in db, add it
    if (!data) {
      console.log(data)
      //create a new tea object using the Tea model and req.body
      const newTea = new Product({
        title: req.body.title,
        image: req.file.path, 
        description: req.body.description,
        price: req.body.price
      })

      // save this object to database
      newTea.save().then(()=>{
        console.log(newTea)
        res.send(newTea).status(200)
      }).catch((err)=>{
        res.status(404).json({
          success: false,
          err
        })
      })
      //if there's an error or the tea is in db, return a message         
    } else {
      if (err) return res.json(`Something went wrong, please try again. ${err}`);
      return res.json({ message: "Tea already exists" });
    }
  })
};

createProduct = async (req, res, next) => {
  try {

    Product.findOne({ title: req.body.title }, (err, data) => {

      if (!data) {
        const newProduct = new Product({
          title: req.body.title,
          description: req.body.description,
          price: req.body.price,
          image: req.file.path,
        })

        newProduct.save((err, data) => {
          if (err) return res.json({ Error: err });
          return res.json(data)
        })

      }
    })

  } catch (error) {
    console.log("Something went wrong");
    res.status(404).json({
      success: false,
      error,
    });
  }
};

// get Product Details
getProductDetails = async (req, res, next) => {
  const product = await Product.find();

  if (!product) {
    res.send({
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    product,
  });
};

// Register user
userRegister = async (req, res, next) => {
  try {
    console.log(req.body);
    const newUser = await user.create(req.body);

    newUser
      .save()
      .then(() => {
        res.status(201).send(newUser);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  } catch (error) {
    console.log("Something went wrong");
    res.status(404).json({
      success: false,
      error,
    });
  }
};

module.exports = {
  postProduct,
  getProductDetails,
  userRegister,
  uploadImg
};



 // console.log(req.body);
    // const newProduct = await Product.create(req.body);

    // newProduct
    //   .save()
    //   .then(() => {
    //     res.status(201).send(newProduct);
    //   })
    //   .catch((err) => {
    //     res.status(400).send(err);
    //   });