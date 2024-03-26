//? 1) first open backend file and npm init -y (-y bch isir linstallation mt3 dependecies toul)
//? 2) npm install express
//? *instally nodemon bch kol mata3mal changes 3al file server yauto yrefrechi
const express = require("express");

//? bch tnajm test3ml el environment variables eli mawjodin fi .env file
require('dotenv').config();


//? 3)tasna3 express app
const app = express();

//? middleware

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

//? routes
app.get("/", (req, res) =>{
  res.json({mssg: "Welcome to the app" })
})

//? 4)lzm tasna3 port bch tnjm ta3ml listening lil requests
app.listen(process.env.PORT, () => {
  console.log("Listening on port", process.env.PORT);
});

//? 5)tnjm tw sa7by tlancy server using the commande: nodemon server.js
