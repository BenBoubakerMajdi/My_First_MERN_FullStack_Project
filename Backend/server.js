//? 1) first open backend file and npm init -y (-y bch isir linstallation mt3 dependecies toul)
//? 2) npm install express
//? *instally nodemon bch kol mata3mal changes 3al file server yauto yrefrechi
const express = require("express");

//? 3)tasna3 express app
const app = express();

//? 4)lzm tasna3 port bch tnjm ta3ml listening lil requests
app.listen(8000, () => {
  console.log("Listening on port 8000");
});

//? 5)tnjm tw sa7by tlancy server using the commande: nodemon server.js
