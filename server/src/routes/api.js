const express = require("express");

const cardsRouter = require("./cards/cards.router");
const decksRouter = require("./decks/decks.router");

const api = express.Router();

const endpoints = {
  cards: "http://localhost:3000/v1/cards/",
  decks: "http://localhost:3000/v1/decks/",
}

//The use of v1 is to set a version to the API

api.use("/cards", cardsRouter);

api.use("/decks", decksRouter);

api.use("/", (req, res) => {
  return res.status(200).json(endpoints);
});

module.exports = api;