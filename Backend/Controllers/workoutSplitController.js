const workoutSplit = require("../Models/workoutSplit");

//? get all

//? get single

//? post
const createWorkoutSplit = async (req, res) => {
  const { name, description, beginDate, endDate } = req.body;
  try {
    if (!name) {
      return res
        .status(400)
        .json({ message: "Please fill the name field at least" });
    }
    const existingWorkoutSplit = await workoutSplit.findOne({ name: name });
    if (!existingWorkoutSplit) {
      const newWorkoutSplit = await workoutSplit.create({
        name,
        description,
        beginDate,
        endDate,
      });
      return res.status(200).json({
        message: "Workout Split Created Successfully",
        data: newWorkoutSplit,
      });
    } else {
      return res.status(400).json({
        message: "Workout Split name already exist. Try a different name",
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//? delete

//? update

module.exports = { createWorkoutSplit };
