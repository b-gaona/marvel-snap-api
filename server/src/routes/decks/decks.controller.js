const { getAllDecks, findDeck, getSchema } = require("../../models/decks.model");

async function httpGetAllDecks(req, res) {
  return res.status(200).json(await getAllDecks());
}

async function httpGetOneDeck(req, res) {
  const did = +req.params.id;
  return res.status(200).json(await findDeck({did}));
}

function httpGetDeckSchema(req, res) {
  return res.status(200).json(getSchema());
}

module.exports = {
  httpGetAllDecks,
  httpGetOneDeck,
  httpGetDeckSchema,
}
