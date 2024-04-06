const mongoose = require("mongoose");
const workoutDay = require("./workoutDay");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    set_range: {
      type: String,
      required: true,
    },

    rep_range: {
      type: String,
      required: true,
    },

    load: {
      type: String,
      required: true,
    },

    pr: {
      type: String,
      required: false,
    },

    description: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("exercise", exerciseSchema);
