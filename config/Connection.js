const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Assignment");
    console.log(`connection is successful`);
  } catch (error) {
    console.log(error);
  }
};


// export 
module.exports = connectDb;
