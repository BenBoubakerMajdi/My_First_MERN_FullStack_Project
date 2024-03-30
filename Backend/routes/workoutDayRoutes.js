const express = require("express");

const workoutDayRoutes = express.Router();

//? 1) tasna3 routes mt3inak
//*GET all workout days
workoutDayRoutes.get("/get", (req, res) => {
  res.json({ mssg: "api ye5dm jwh behy" });
});

//*GET a single workout day
workoutDayRoutes.get("/get/:id", (req, res) => {
  res.json({ mssg: "api ye5dm jwh behy" });
});

//*POST a new workout day
workoutDayRoutes.post("/post", (req, res) => {
  res.json({ mssg: "api ye5dm jwh behy" });
});

//*DELETE a workout day
workoutDayRoutes.delete("/remove/:id", (req, res) => {
  res.json({ mssg: "api ye5dm jwh behy" });
});

//*UPDATE a workout day
workoutDayRoutes.patch("/update/:id", (req, res) => {
  res.json({ mssg: "api ye5dm jwh behy" });
});

module.exports = workoutDayRoutes;
