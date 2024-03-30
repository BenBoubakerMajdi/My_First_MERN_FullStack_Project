//? 1) trequiry express
const express = require("express");
const workoutSplit = require("../Models/workoutSplit");
const { createWorkoutSplit } = require("../Controllers/workoutSplitController");

//? 2) tecreaty a route instance men express.Router()
const workoutSplitRoutes = express.Router();

//? 1) tasna3 routes mt3inak
//*GET all workouts
workoutSplitRoutes.get("/get", (req, res) => {
  res.json({ mssg: "api ye5dm jwh behy" });
});

//*GET a single workout
workoutSplitRoutes.get("/get/:id", (req, res) => {
  res.json({ mssg: "api ye5dm jwh behy" });
});

//*POST a new workout
workoutSplitRoutes.post("/post", createWorkoutSplit);

//*DELETE a workout
workoutSplitRoutes.delete("/remove/:id", (req, res) => {
  res.json({ mssg: "api ye5dm jwh behy" });
});

//*UPDATE a workout
workoutSplitRoutes.patch("/update/:id", (req, res) => {
  res.json({ mssg: "api ye5dm jwh behy" });
});

//? 2) lzm texporty snn makch bch tnajm test3mlhom fil app
module.exports = workoutSplitRoutes;
