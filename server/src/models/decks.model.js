const { parse } = require("csv-parse");

const path = require("path");
const fs = require("fs");

const decks = require("./decks.mongo");
const { findCards } = require("./cards.model");

function loadDecksData() {
  return new Promise((resolve, reject) => {
    //With .createReadStream we create a new stram data and we read it
    fs.createReadStream(path.join(__dirname, "..", "..", "data", "decks.csv"))
      //Pipe function will parse all the data given, this function only works with readable streams
      .pipe(
        parse({
          columns: true, //Returns it as a JS object
        })
      )
      //If it gets data, save it
      .on("data", async (data) => {
        await saveDeck(data);
      })
      .on("error", (error) => {
        console.log(error);
        reject(error);
      })
      .on("end", async () => {
        const countDecksFound = (await getAllDecks()).length;
        console.log(`${countDecksFound} decks!`);
        resolve();
      });
  });
}

async function saveDeck(deck) {
  try {
    //It adds a document in our decks collection
    //The first parameter is the filter, so, it will update just the one that matches with that filter
    //The second parameter is the new value, if it's compatible, the value is exactly the same
    //The third says that if it's not compatible, the deck will be created

    //Object cards
    const array = JSON.parse(deck.cids).map(String);
    const records = await findCards(array);

    await decks.updateOne(
      {
        name: deck.name,
      },
      {
        did: deck.did,
        name: deck.name,
        avg_power: deck.avg_power,
        avg_cost: deck.avg_cost,
        cids: records,
      },
      {
        // insert + update = upsert  <- Just inserts if it doesn't exist
        upsert: true,
      }
    );
  } catch (error) {
    console.error(`Couldn't save deck ${error}`);
  }
}

async function getAllDecks() {
  //https://mongoosejs.com/docs/api/model.html#model_Model-find
  // {} means no filters, but we can match documents, for example {keplerName: "Bla bla"}
  return await decks.find({}, "").limit(10); //The second parameter is the field that we need to extract, if we need more just add " ", if we want all except one "-field"
}

async function findDeck(filter) {
  return await decks.findOne(filter);
}

function getSchema() {
  return decks.schema.paths;
}

module.exports = {
  loadDecksData,
  getAllDecks,
  findDeck,
  getSchema,
};
