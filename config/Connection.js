const mongoose = require("mongoose");

const url = `mongodb://localhost:27017/Assignment`;
const connectDb = async () => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`connect successfully`);
    })
    .catch((err) => {
      console.log(`something went wrong`);
    });
};

module.exports = connectDb;
