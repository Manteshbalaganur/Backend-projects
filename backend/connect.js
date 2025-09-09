// // data base connection file
// const mongoose = require("mongoose");

// const connectDB = async (url) => {
//   try {
//     await mongoose.connect(url);
//     console.log("MongoDB Connected...");
//   } catch (err) {
//     console.error("MongoDB connection failed:", err.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

const mongoose = require("mongoose");

function connectDB(url) {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = connectDB;
