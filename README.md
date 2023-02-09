# Marvel Snap API
## Table of contents

* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)

### General info
------------
It's created with Node.js, Express.js, Vanilla JS, Sass and some npm modules. It uses an MVC architecture. The server side is written with Node.js and Express.js, and the client side is written in basic HTML, CSS and Vanilla JS. This project uses information of a dataset found in[ Kaggle.com.](https://www.kaggle.com/ " Kaggle.com. ")

Here's the link of the original dataset: [Marvel SNAP: Decks and cards - Dataset.](https://www.kaggle.com/datasets/jeanmidev/marvel-snap-decks-and-cards "Marvel SNAP: Decks and cards - Dataset")
This project has its own documentation about how to use it and how to fetch its data.

### Technologies
------------
Project is created with:
* Node.js.
* Express.js.
* Vanilla JS.
* MongoDB.
* Mongoose.
* SCSS.

### Setup
------------
To run this project, install it locally using npm:
```
$ cd `yourFolderPath`
$ npm install
$ npm run build
$ npm start
```
This project uses Gulp.js to build, minimize the code and the images. To build the project you have to use the `npm run build` command. Once you have built the project, the compressed code will be located in the public folder inside of the server folder.

Don't forget to create your env variables in the server side. The **PORT** variable is the port where the server runs, and the **MONGO_URL** is the link provided by MongoDB Atlas.

Finally, use the `npm start` command to start the server. If you don't start the server, you won't be able to see the decks and cards. Once you have done that, open `http://localhost:yourSelectedPort/` in your prefered browser and enjoy.

### Features
------------
* Swiper.js is used to show the cards and the decks in a fantastic way.
* It uses awesome fonts of some Marvel movies.
* The .csv files are located in the data folder inside the server folder.
* The data collected from the .csv file found in Kaggle is moved to MongoDB Atlas.
* The endpoints are mentioned in the routes folder.
* The schemas are located in the models folder. There's defined the way that the card or deck has to be sent.
