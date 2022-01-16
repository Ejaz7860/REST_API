const user = require("../model/User");

userRegister = async (req, res, next) => {
  try {
    console.log(req.body);
    const newUser = new user(req.body);
    let result = await newUser.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
  } catch (error) {
    console.log("Something went wrong");
    res.status(404).json({
      success: false,
      error,
    });
  }
};

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
