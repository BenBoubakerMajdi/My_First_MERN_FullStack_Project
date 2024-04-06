//*********! Fully Tested ***********/

const workoutSplit = require("../Models/workoutSplit");
const workoutDay = require("../Models/workoutDay");
const mongoose = require("mongoose");

//? get all Workout Days for that specific Workout Split(TESTED)
const getAllWorkoutDays = async (req, res) => {
  const { id_WorkoutSplit } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id_WorkoutSplit)) {
    return res
      .status(404)
      .json({ error: "Invalid Workout Split ID to find the Workout Days in" });
  }

  try {
    const WorkoutSplit = await workoutSplit.findById( id_WorkoutSplit );
    if (!WorkoutSplit) {
      return res
        .status(404)
        .json({ error: "Workout Split Not Found. Cannot find Workout Days in" });
    }
    const WorkoutDays_ids = WorkoutSplit.workoutDays;

    const WorkoutDays = await workoutDay.find({
      _id: { $in: WorkoutDays_ids },
    }).sort({ createdAt: 1 });
    return res.status(200).json({
      message:
        "Workout Days for that Specific Workout Split Found Successfully",
      data: WorkoutDays,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//? get single(Tested)
const getWorkoutDay = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Workout Day ID" });
    }
    const WorkoutDay = await workoutDay.findById(id);
    if (!WorkoutDay) {
      return res.status(404).json({
        error: "No Workout Day Found with that ID",
      });
    }
    return res.status(200).json({
      message: "Workout Day Found Successfully",
      data: WorkoutDay,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//? post(Tested)
const createWorkoutDay = async (req, res) => {
  const { id_WorkoutSplit } = req.params;
  const { name, description } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id_WorkoutSplit)) {
    return res.status(400).json({
      error: "Invalid Workout Split ID. Cannot Create Workout Day",
    });
  }
  try {
    if (!name) {
      return res
        .status(400)
        .json({ message: "Please fill the name field at least" });
    }
    const WorkoutSplit = await workoutSplit.findById({ _id: id_WorkoutSplit });
    if (!WorkoutSplit) {
      return res.status(404).json({
        error: "Workout Split Not Found --> Cannot Create a New Workout Day in",
      });
    }
    const NewWorkoutDay = await workoutDay.create({
      name,
      description,
    });

    WorkoutSplit.workoutDays.push(NewWorkoutDay._id);
    await WorkoutSplit.save();

    return res.status(201).json({
      message: "Workout Day Created Successfully",
      data: NewWorkoutDay,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//? delete(Tested)
const deleteWorkoutDay = async (req, res) => {
  const { id } = req.body;
  try {
    const WorkoutDayDeleted = await workoutDay.findOneAndDelete({ _id: id });
    return res.status(200).json({
      message:
        "Workout Day Pre Removal handeled by the Middelware, Workout Day Removed Successfully",
      data: WorkoutDayDeleted,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//! the form that will be sent will have auto filled values when it gets opened by the user
//? update(Tested)
const updateWorkoutDay = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid Workout Day ID" });
  }
  try {
    if (!name) {
      return res
        .status(400)
        .json({ message: "Please Fill the name field at Least" });
    }
    const WorkoutDayToUpdate = await workoutDay.findById(id);
    if (!WorkoutDayToUpdate) {
      return res
        .status(404)
        .json({ error: "Workout Day Already Doesn't Exist" });
    }
    const UpdatedWorkoutDay = await workoutDay.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    return res.status(200).json({
      message: "Workout Day Updated Successfully",
      data: UpdatedWorkoutDay,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllWorkoutDays,
  getWorkoutDay,
  createWorkoutDay,
  deleteWorkoutDay,
  updateWorkoutDay,
};
