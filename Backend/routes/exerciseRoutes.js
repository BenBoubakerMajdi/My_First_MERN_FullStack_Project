const express = require('express');

const exerciseRoutes = express.Router();

//*GET all Exercises
exerciseRoutes.get("/get/:workoutDayID", (req, res) => {
    res.json({mssg: "api ye5dm jwh behy"})
});

//*GET a single exercise
exerciseRoutes.get("/get/:id", (req, res) => {
    res.json({mssg: "api ye5dm jwh behy"})
});

//*POST a new exercise
exerciseRoutes.post("/post", (req, res) => {
    res.json({mssg: "api ye5dm jwh behy"})
});

//*DELETE a exercise
exerciseRoutes.delete("/remove", (req, res) => {
    res.json({mssg: "api ye5dm jwh behy"})
});

//*UPDATE a exercise
exerciseRoutes.patch("/update/:id", (req, res) => {
    res.json({mssg: "api ye5dm jwh behy"})
});

module.exports = exerciseRoutes;