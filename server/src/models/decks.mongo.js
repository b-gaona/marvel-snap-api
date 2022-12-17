const mongoose = require("mongoose");

const decksSchema = new mongoose.Schema({
  did: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  cids: {
    type: Array,
    required: true,
  },
  avg_power: {
    type: Number,
    required: true,
  },
  avg_cost: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Deck", decksSchema);
