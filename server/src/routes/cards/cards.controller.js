const { getAllCards } = require("../../models/cards.model");

async function httpGetAllCards(req, res) {
  return res.status(200).json(await getAllCards());
}

module.exports = {
  httpGetAllCards,
}
