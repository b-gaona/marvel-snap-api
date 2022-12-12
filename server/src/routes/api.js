const express = require("express");

const cardsRouter = require("./cards/cards.router");

const api = express.Router();

//The use of v1 is to set a version to the API
api.use("/cards", cardsRouter);

module.exports = api;