const mongoose = require("mongoose");

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
    
    exercises: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'exercise'
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("workoutDay", workoutDaySchema);
