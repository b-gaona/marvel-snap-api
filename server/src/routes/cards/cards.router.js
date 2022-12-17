const express = require("express");
const { httpGetAllCards, httpGetOneCard, httpGetCardSchema } = require("./cards.controller");

const cardsRouter = express.Router();

cardsRouter.get("/schema", httpGetCardSchema);

cardsRouter.get("/:id", httpGetOneCard);

cardsRouter.get("/", httpGetAllCards);

module.exports = cardsRouter;