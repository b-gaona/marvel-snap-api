const {
  getAllCards,
  findCard,
  getSchema,
} = require("../../models/cards.model");

async function httpGetAllCards(req, res) {
  return res.status(200).json(await getAllCards());
}

async function httpGetOneCard(req, res) {
  const cid = +req.params.id;
  return res.status(200).json(await findCard({ cid }));
}

function httpGetCardSchema(req, res) {
  return res.status(200).json(getSchema());
}

module.exports = {
  httpGetAllCards,
  httpGetOneCard,
  httpGetCardSchema,
};
