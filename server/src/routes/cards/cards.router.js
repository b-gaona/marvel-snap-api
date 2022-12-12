const express = require("express");
const { httpGetAllCards } = require("./cards.controller");

const cardsRouter = express.Router();

cardsRouter.get("/", httpGetAllCards);

module.exports = cardsRouter;