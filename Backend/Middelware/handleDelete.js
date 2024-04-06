const mongoose = require("mongoose");
const workoutSplit = require("../Models/workoutSplit");
const workoutDay = require("../Models/workoutDay");
const exercise = require("../Models/exercise");

const handleDeleteWorkoutSplit = async (req, res, next) => {
  const { id } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid Workout Split ID" });
  }
  try {
    const WorkoutSplitToDelete = await workoutSplit.findById(id);
    if (!WorkoutSplitToDelete) {
      return res
        .status(404)
        .json({ error: "Workout Split ID Already Doesn't Exist" });
    }

    const ids_WorkoutDaysToDelete = WorkoutSplitToDelete.workoutDays;

    if (ids_WorkoutDaysToDelete.length > 0) {
      for (const id_workoutDayToDelete of ids_WorkoutDaysToDelete) {
        const WorkoutDayToDelete = await workoutDay.findById(
          id_workoutDayToDelete
        );
        if (WorkoutDayToDelete) {
          const ids_ExercisesToDelete = WorkoutDayToDelete.exercises;
          if (ids_ExercisesToDelete.length > 0) {
            await exercise.deleteMany({ _id: { $in: ids_ExercisesToDelete } });
          }
        }
      }
    }
    await workoutDay.deleteMany({ _id: { $in: ids_WorkoutDaysToDelete } });

    next();

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//?Tested
const handleDeleteWorkoutDay = async (req, res, next) => {
  const { id_WorkoutSplit } = req.params;
  const { id } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id_WorkoutSplit)) {
    return res.status(404).json({
      error: "Invalid Workout Split ID. Cannot Delete the Workout Day",
    });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid Workout Day ID" });
  }

  try {
    const WorkoutSplit = await workoutSplit.findById(id_WorkoutSplit);
    const WorkoutDayToDelete = await workoutDay.findById(id);
    if (!WorkoutSplit) {
      return res
        .status(404)
        .json({ error: "Workout Split Not Found. Cannot Delete the Workout Day in" });
    }
    if (!WorkoutDayToDelete) {
      return res
        .status(404)
        .json({ error: "Workout Day Not Found" });
    }

    const updatedWorkoutSplit = await workoutSplit.updateOne(
      { _id: id_WorkoutSplit },
      { $pull: { workoutDays: id } }
    );

    const ids_ExercisesToDelete = WorkoutDayToDelete.exercises;
    const ExercisesDeleted = await exercise.deleteMany({
      _id: { $in: ids_ExercisesToDelete },
    });
    if (updatedWorkoutSplit && ExercisesDeleted) {
      next();
    } else {
      return res
        .status(500)
        .json({ error: "Failed to update Workout Split or delete Exercises." });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { handleDeleteWorkoutSplit, handleDeleteWorkoutDay };
