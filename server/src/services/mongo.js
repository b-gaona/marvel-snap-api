const mongoose = require("mongoose");

require("dotenv").config();

const MONGO_URL= process.env.MONGO_URL;

//It's just triggered once, it's like to put an on event, but just once
mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready !");
});
mongoose.connection.on("error", (error) => {
  console.error(error);
});

async function mongoConnect() {
  return await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
  return await mongoose.disconnect(); //It already knows what url is
}

module.exports = {
  mongoConnect,
  mongoDisconnect
}