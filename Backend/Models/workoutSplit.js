const mongoose = require("mongoose");

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
module.exports = mongoose.model("workoutSplit", workoutSplitSchema);
