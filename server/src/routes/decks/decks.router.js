const express = require("express");
const { httpGetAllDecks, httpGetOneDeck, httpGetDeckSchema } = require("./decks.controller");

const decksRouter = express.Router();

decksRouter.get("/schema", httpGetDeckSchema);

decksRouter.get("/:id", httpGetOneDeck);

decksRouter.get("/", httpGetAllDecks);

module.exports = decksRouter;