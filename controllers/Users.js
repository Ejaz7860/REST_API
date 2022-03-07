const user = require("../model/User");
const bcrypt = require("bcrypt");

// SignUP
userRegister = async (req, res, next) => {
  try {
    const { name, email, password, confirm_password } = req.body;
    const existUser = await user.find({ email });

    if (existUser) {
      res.send({
        message: "Email already exists",
      });
    } else {
      if (name && email && password && confirm_password) {
        if (password === confirm_password) {
          const newUser = await new user({
            name,
            email,
            password,
            confirm_password,
          });

          newUser.save().then((data) => {
            res.status(201).json({
              success: true,
              data,
            });
          });
        } else {
          res.send({ message: "Password did not match" });
        }
      } else {
        res.send({ message: "All fileds are required" });
      }
    }
  } catch (error) {
    console.log("Something went wrong");
    res.status(404).json({
      success: false,
      error,
    });
  }
};

// Login
userLogin = async (req, res, next) => {
  if (req.body.password && req.body.email) {
    let newUser = await user.findOne(req.body).select("-password");

    if (newUser) {
      res.send(newUser);
    } else {
      res.send({ result: "No user found" });
    }
  }
};

module.exports = {
  userRegister,
  userLogin,
};
