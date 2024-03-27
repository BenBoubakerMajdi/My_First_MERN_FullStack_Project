//? 1) first open backend file and npm init -y (-y bch isir linstallation mt3 dependecies toul)
//? 2) npm install express
//? *instally nodemon bch kol mata3mal changes 3al file server yauto yrefrechi
const express = require("express");

//? bch tnajm test3ml el environment variables eli mawjodin fi .env file
require("dotenv").config();

//? *bch timporty routes o test3mlhom fil app ta3ml app.use(route haka)
const workoutRoutes = require("./routes/workouts");

//? 3)tasna3 express app
const app = express();

//? middleware
//? *tchof kana fama data fi req (req.body) tatachih fi req object bch tnjm mb3d taccessih fi traitement (DELETE, Patch)
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//? routes
app.use("/api/Workouts", workoutRoutes);

//? 4)lzm tasna3 port bch tnjm ta3ml listening lil requests
app.listen(process.env.PORT, () => {
  console.log("Listening on port", process.env.PORT);
});

//? 5)tnjm tw sa7by tlancy server using the commande: nodemon server.js
