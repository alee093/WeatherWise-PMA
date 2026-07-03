require("dotenv").config();

const app = require("../app");
const connectDB = require("../config/database");

let isConnected = false;

module.exports = async (req, res) => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }

  return app(req, res);
};