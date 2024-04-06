//? 1) trequiry express
const express = require("express");
const {
  getAllWorkoutSplits,
  getWorkoutSplit,
  createWorkoutSplit,
  deleteWorkoutSplit,
  updateWorkoutSplit,
} = require("../Controllers/workoutSplitController");

const { handleDeleteWorkoutSplit } = require("../Middelware/handleDelete")

//? 2) tecreaty a route instance men express.Router()
const workoutSplitRoutes = express.Router();

//? 1) tasna3 routes mt3inak
workoutSplitRoutes.get("/get", getAllWorkoutSplits);
workoutSplitRoutes.get("/get/:id", getWorkoutSplit);
workoutSplitRoutes.post("/post", createWorkoutSplit);
workoutSplitRoutes.delete("/remove", handleDeleteWorkoutSplit, deleteWorkoutSplit);
workoutSplitRoutes.patch("/update/:id", updateWorkoutSplit);

//? 2) lzm texporty snn makch bch tnajm test3mlhom fil app
module.exports = workoutSplitRoutes;
