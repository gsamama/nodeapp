const mongoose = require("mongoose");
const schema = mongoose.Schema;

const workoutSchema = schema({
  User: {type: String, required: true, unique: false},
  Type: {type: String, required: true, unique: false},
  Location: {type: String, required: true, unique: false},
  Duration: {type: Number, required: true, unique: false},
  Comments: {type: String, required: false, unique: false},
  PollutionLevel: {type: String, required: false, unique: false},
  Date: {type: Date, default: Date().now}
});

module.exports = mongoose.model('Workout', workoutSchema);
