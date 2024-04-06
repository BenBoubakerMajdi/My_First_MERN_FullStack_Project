const express = require("express");
const {
  getAllWorkoutDays,
  getWorkoutDay,
  createWorkoutDay,
  deleteWorkoutDay,
  updateWorkoutDay,
} = require("../Controllers/workoutDayController");

const { handleDeleteWorkoutDay } = require("../Middelware/handleDelete")

const workoutDayRoutes = express.Router();

workoutDayRoutes.get("/get/:id_WorkoutSplit", getAllWorkoutDays);
workoutDayRoutes.get("/get-day/:id", getWorkoutDay);
workoutDayRoutes.post("/post/:id_WorkoutSplit", createWorkoutDay);
workoutDayRoutes.delete("/remove/:id_WorkoutSplit", handleDeleteWorkoutDay, deleteWorkoutDay);
workoutDayRoutes.patch("/update/:id", updateWorkoutDay);

module.exports = workoutDayRoutes;
