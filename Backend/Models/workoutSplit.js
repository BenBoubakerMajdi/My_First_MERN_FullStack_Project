const mongoose = require("mongoose");
const workoutDay = require("./workoutDay");

const Schema = mongoose.Schema;

const workoutSplitSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: false,
    },

    beginDate: {
      type: Date,
      required: false,
    },

    endDate: {
      type: Date,
      required: false,
    },

    workoutDays: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "workoutDay",
      },
    ],
  },
  { timestamps: true }
);

workoutSplitSchema.pre("deleteMany", async function (next) {
  try {
    await workoutDay.deleteMany({ _id: { $in: this.workoutDays } });
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("workoutSplit", workoutSplitSchema);
