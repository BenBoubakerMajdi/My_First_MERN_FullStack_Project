//*********!  FULLY TESTED ****************
const workoutDay = require("../Models/workoutDay");
const exercise = require("../Models/exercise");
const mongoose = require("mongoose");

//? get all exercises for that specific Workout Day(Tested)
const getAllExercises = async (req, res) => {
  const { id_WorkoutDay } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id_WorkoutDay)) {
    return res
      .status(404)
      .json({ error: "Invalid Workout Day ID. Cannot Find the Exercises in" });
  }

  try {
    const WorkoutDay = await workoutDay.findById(id_WorkoutDay);
    if (!WorkoutDay) {
      return res
        .status(404)
        .json({ error: "Workout Day Not Found. Cannot Find the Exercises in" });
    }
    const Exercises_ids = WorkoutDay.exercises;
    const Exercises = await exercise.find({ _id: { $in: Exercises_ids } }).sort({ createdAt: 1 });
    return res.status(200).json({
      message: "Exercises for that Specific Workout Day Found Successfully",
      data: Exercises,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//? get single(Tested)
const getExercise = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid Exercise ID" });
    }
    const Exercise = await exercise.findById(id);
    if (!Exercise) {
      return res.status(404).json({
        error: "No Exercise Found with that ID",
      });
    }
    return res.status(200).json({
      message: "Exercise Found Successfully",
      data: Exercise,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//? post(Tested)
const createExercise = async (req, res) => {
  const { id_WorkoutDay } = req.params;
  const { name, set_range, rep_range, load } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id_WorkoutDay)) {
    return res
      .status(404)
      .json({ error: "Invalid WorkoutDay ID. Cannot Add the Exercise in" });
  }
  try {
    const WorkoutDay = await workoutDay.findById(id_WorkoutDay);
    if (!WorkoutDay) {
      return res.status(404).json({
        error: "Workout Day Not Found. Cannot Create an Exercise in!",
      });
    }

    if (!name || !set_range || !rep_range || !load) {
      return res
        .status(400)
        .json({ error: "Please fill the necessary fields" });
    }

    const NewExercise = await exercise.create({ ...req.body });
    WorkoutDay.exercises.push(NewExercise._id);
    await WorkoutDay.save();

    return res.status(201).json({
      message: "Exercise Created Successfully",
      data: NewExercise,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//? delete(Tested)
const deleteExercise = async (req, res) => {
  const { id_WorkoutDay } = req.params;
  const { id } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id_WorkoutDay)) {
    return res.status(404).json({
      error: "Invalid Workout Day ID. Cannot Delete the Exercise in",
    });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      error: "Invalid Exercise ID",
    });
  }
  try {
    const WorkoutDay = await workoutDay.findById(id_WorkoutDay);
    const ExerciseToDelete = await exercise.findById(id);
    if (!WorkoutDay) {
      return res
        .status(404)
        .json({
          error: "Workout Day Not Found. Cannot Delete the Exercise in",
        });
    }
    if (!ExerciseToDelete) {
      return res.status(404).json({ error: "Exercise Already Doesn't Exist" });
    }
    await workoutDay.updateOne(
      { _id: id_WorkoutDay },
      { $pull: { exercises: id } }
    );
    await exercise.deleteOne({ _id: id });
    return res.status(200).json({
      message: "Exercise Removed Successfully",
      data: ExerciseToDelete,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//! the form that will be sent will have auto filled values when it gets opened by the user
//? update(Tested)
const updateExercise = async (req, res) => {
  const { id } = req.params;
  const { name, set_range, rep_range, load } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid Exercise ID" });
  }
  try {
    const ExerciseToUpdate = await exercise.findById(id);
    if (!ExerciseToUpdate) {
      return res.status(404).json({ error: "Exercise Already Doesn't Exist" });
    }
    if (!name || !set_range || !rep_range || !load) {
      return res
        .status(400)
        .json({ error: "Please fill the necessary fields" });
    }

    const UpdatedExercise = await exercise.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    return res.status(200).json({
      message: "Exercise Updated Successfully",
      data: UpdatedExercise,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllExercises,
  getExercise,
  createExercise,
  deleteExercise,
  updateExercise,
};
