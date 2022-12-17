const { parse } = require("csv-parse");

const path = require("path");
const fs = require("fs");

const cards = require("./cards.mongo");

function loadCardsData() {
  return new Promise((resolve, reject) => {
    //With .createReadStream we create a new stram data and we read it
    fs.createReadStream(path.join(__dirname, "..", "..", "data", "cards.csv"))
      //Pipe function will parse all the data given, this functions only works with readable streams
      .pipe(
        parse({
          comment: "#", //Treats this lines as comments
          columns: true, //Returns it as a JS object
        })
      )
      //If it gets data, save it into the DB
      .on("data", async (data) => {
        await saveCard(data);
      })
      .on("error", (error) => {
        console.log(error);
        reject(error);
      })
      .on("end", async () => {
        const countCardsFound = (await getAllCards()).length;
        console.log(`${countCardsFound} cards!`);
        resolve();
      });
  });
}

async function saveCard(card) {
  try {
    //It adds a document in our cards collection
    //The first parameter is the filter, so, it will update just the one that matches with that filter
    //The second parameter is the new value, if it's compatible, the value is exactly the same
    //The third says that if it's not compatible, the card will be created
    await cards.updateOne(
      {
        cid: card.cid,
      },
      card,
      {
        // insert + update = upsert  <- Just inserts if it doesn't exist
        upsert: true,
      }
    );
  } catch (error) {
    console.error(`Couldn't save card ${error}`);
  }
}

async function getAllCards() {
  //https://mongoosejs.com/docs/api/model.html#model_Model-find
  // {} means no filters, but we can match documents, for example {keplerName: "Bla bla"}
  return await cards.find({}, ""); //The second parameter is the field that we need to extract, if we need more just add " ", if we want all except one "-field"
}

async function findCard(filter) {
  return await cards.findOne(filter);
}

async function findCards(values) {
  return await cards.find({ cid: { $in: values } });
}

function getSchema() {
  return cards.schema.paths;
}

module.exports = {
  loadCardsData,
  getAllCards,
  findCard,
  findCards,
  getSchema,
};
