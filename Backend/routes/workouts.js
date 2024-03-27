//? 1) trequiry express
const express = require("express");

//? 2) tecreaty a route instance men express.Router()
const routes = express.Router();

//? 1) tasna3 routes mt3inak
//*GET all workouts
routes.get("/", () => {});

//*GET a single workout
routes.get("/:id", () => {});

//*POST a new workout
routes.post("/", () => {});

//*DELETE a workout
routes.delete("/:id", () => {});

//*UPDATE a workout
routes.patch("/:id", () => {});

//? 2) lzm texporty snn makch bch tnajm test3mlhom fil app
module.exports = routes;
