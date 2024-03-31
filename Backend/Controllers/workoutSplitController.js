const workoutSplit = require("../Models/workoutSplit");
const mongoose = require("mongoose");

//? get all
const getAllWorkoutSplits = async (req, res) => {
  try {
    const WorkoutSplits = await workoutSplit.find({}).sort({ createdAt: 1 });
    return res.status(200).json({
      message: "Workout Splits Found Successfully",
      data: WorkoutSplits,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//? get single
const getWorkoutSplit = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid Workout Split ID" });
    }
    const WorkoutSplit = await workoutSplit.findById({ _id: id });
    return res.status(200).json({
      message: "a Workout Split Found Successfully",
      data: WorkoutSplit,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//? post
const createWorkoutSplit = async (req, res) => {
  const { name, description, beginDate, endDate } = req.body;
  try {
    if (!name) {
      return res
        .status(400)
        .json({ message: "Please fill the name field at least" });
    }
    const ExistingWorkoutSplit = await workoutSplit.findOne({ name: name });
    if (!ExistingWorkoutSplit) {
      const NewWorkoutSplit = await workoutSplit.create({
        name,
        description,
        beginDate,
        endDate,
      });
      return res.status(200).json({
        message: "Workout Split Created Successfully",
        data: NewWorkoutSplit,
      });
    } else {
      return res.status(400).json({
        message: "Workout Split name already exist. Try a different name",
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//! Still need to be tested in cascade deletion
//? delete
const deleteWorkoutSplit = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid Workout Split ID" });
  }
  try {
    const WorkoutSplit = await workoutSplit.findOneAndDelete({ _id: id });
    return res.status(200).json({
      message: "Workout Split removed Successfully",
      data: WorkoutSplit,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//! the form that will be sent already have auto filled values when it gets opened by the user
//? update
const updateWorkoutSplit = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid Workout Split ID" });
  }
  try {
    if (!name) {
      return res
        .status(400)
        .json({ message: "Please Fill the name field at Least" });
    }
    const UpdatedWorkoutSplit = await workoutSplit.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    return res.status(200).json({
      message: "Workout Split Updated Successfully",
      data: UpdatedWorkoutSplit,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllWorkoutSplits,
  getWorkoutSplit,
  createWorkoutSplit,
  deleteWorkoutSplit,
  updateWorkoutSplit,
};
