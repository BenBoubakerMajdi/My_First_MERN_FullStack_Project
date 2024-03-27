//? 1) first open backend file and npm init -y (-y bch isir linstallation mt3 dependecies toul)
//? 2) npm install express
//? *instally nodemon bch kol mata3mal changes 3al file server yauto yrefrechi
const express = require("express");
const mongoose = require("mongoose");

//? bch tnajm test3ml el environment variables eli mawjodin fi .env file
require("dotenv").config();

//? *bch timporty routes o test3mlhom fil app ta3ml app.use(route haka)
const workoutRoutes = require("./routes/workouts");

//? 3)tasna3 express app
const app = express();

//! middleware
//? *tchof kana fama data fi req (req.body) tatachih fi req object bch tnjm mb3d taccessih fi traitement (DELETE, Patch)
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//! routes
app.use("/api/workouts", workoutRoutes);

//! connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //? *tasna3 port bch tnjm ta3ml listening lil requests
    app.listen(process.env.PORT, () => {
      console.log("Connected to MongoDB :)\nListening on port", process.env.PORT);
    });
  })
  .catch((err) => console.log("Failed to connect to MongoDB :(", err));

//? 5)tnjm tw tlancy server using the commande: nodemon server.js / npm run dev
