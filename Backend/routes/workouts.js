//? 1) trequiry express
const express = require("express");

//? 2) tecreaty a route instance men express.Router()
const routes = express.Router();

//? 1) tasna3 routes mt3inak
//*GET all workouts
routes.get("/", (req, res) => {
    res.json({mssg: "api ye5dm jwh behy"})
});

//*GET a single workout
routes.get("/:id", (req, res) => {
    res.json({mssg: "api ye5dm jwh behy"})
});

//*POST a new workout
routes.post("/", (req, res) => {
    res.json({mssg: "api ye5dm jwh behy"})
});

//*DELETE a workout
routes.delete("/:id", (req, res) => {
    res.json({mssg: "api ye5dm jwh behy"})
});

//*UPDATE a workout
routes.patch("/:id", (req, res) => {
    res.json({mssg: "api ye5dm jwh behy"})
});

//? 2) lzm texporty snn makch bch tnajm test3mlhom fil app
module.exports = routes;
