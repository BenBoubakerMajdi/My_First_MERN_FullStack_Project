const mongoose = require("mongoose");
const exercise = require("./exercise");

const Schema = mongoose.Schema;

const workoutDaySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: false,
    },

    exercises: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "exercise",
      },
    ],
  },
  { timestamps: true }
);

workoutDaySchema.pre("deleteMany", async function (next) {
  try {
    await exercise.deleteMany({ _id: { $in: this.exercises } });
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("workoutDay", workoutDaySchema);
