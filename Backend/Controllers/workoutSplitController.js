//*********! FULLY tESTED ************
const workoutSplit = require("../Models/workoutSplit");
const mongoose = require("mongoose");

//? get all(Tested)
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

//? get single(Tested)
const getWorkoutSplit = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid Workout Split ID" });
    }
    const WorkoutSplit = await workoutSplit.findById({ _id: id });
    if (!WorkoutSplit) {
      return res.status(404).json({ error: "Workout Split Not Found" });
    }
    return res.status(200).json({
      message: "Workout Split Found Successfully",
      data: WorkoutSplit,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//? post(Tested)
const createWorkoutSplit = async (req, res) => {
  const { name, description, beginDate, endDate } = req.body;
  try {
    if (!name) {
      return res
        .status(400)
        .json({ error: "Please fill the name field at least" });
    }
    const ExistingWorkoutSplit = await workoutSplit.findOne({ name: name });
    if (!ExistingWorkoutSplit) {
      const NewWorkoutSplit = await workoutSplit.create({
        name,
        description,
        beginDate,
        endDate,
      });
      return res.status(201).json({
        message: "Workout Split Created Successfully",
        data: NewWorkoutSplit,
      });
    } else {
      return res.status(400).json({
        error: "Workout Split name already exist. Try a different name",
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//? delete(Tested in cascade)
const deleteWorkoutSplit = async (req, res) => {
  const { id } = req.body;
  try {
    const WorkoutSplitDeleted = await workoutSplit.findOneAndDelete({ _id: id });
    return res.status(200).json({
      message:
        "Workout Split Pre Removal handeled by the Middelware, Workout Split Removed Successfully",
      data: WorkoutSplitDeleted,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//! the form that will be sent already have auto filled values when it gets opened by the user
//? update(Tested)
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
        .json({ error: "Please Fill the name field at Least" });
    }
    const ExistingWorkoutSplit = await workoutSplit.findOne({
      $and: [{ _id: { $ne: new mongoose.Types.ObjectId(id) } }, { name: name }],
    });
    if (!ExistingWorkoutSplit) {
      const UpdatedWorkoutSplit = await workoutSplit.findOneAndUpdate(
        { _id: id },
        { ...req.body },
        { new: true }
      );
      return res.status(200).json({
        message: "Workout Split Updated Successfully",
        data: UpdatedWorkoutSplit,
      });
    }
    return res.status(400).json({
      error: "Workout Split name already exist. Cannot update the Split",
      data: ExistingWorkoutSplit,
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
