const mongoose = require("mongoose");

const cardsSchema = new mongoose.Schema({
  cid: {
    type: Number, 
    required: true,
  },
  cname: {
    type: String, 
    required: true,
  },
  art: {
    type: String,
    required: true,
  },
  ability:{
    type: String, 
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  power: {
    type: Number, 
    required: true,
  }
})

module.exports = mongoose.model("Card", cardsSchema);