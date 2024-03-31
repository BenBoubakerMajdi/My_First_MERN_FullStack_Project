const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    set_range: {
      type: Number,
      required: true,
    },

    rep_range: {
      type: String,
      required: true,
    },

    load: {
      type: Number,
      required: false,
    },

    pr: {
      type: Number,
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
