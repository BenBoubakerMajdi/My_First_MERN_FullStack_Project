const express = require("express");
const {
  getAllExercises,
  getExercise,
  createExercise,
  deleteExercise,
  updateExercise,
} = require("../Controllers/exerciceController");

const exerciseRoutes = express.Router();

exerciseRoutes.get("/get/:id_WorkoutDay", getAllExercises);
exerciseRoutes.get("/get-exercise/:id", getExercise);
exerciseRoutes.post("/post/:id_WorkoutDay", createExercise);
exerciseRoutes.delete("/remove/:id_WorkoutDay", deleteExercise);
exerciseRoutes.patch("/update/:id", updateExercise);

module.exports = exerciseRoutes;
