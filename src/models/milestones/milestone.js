const mongoose = require("mongoose");
const {taskSchema} = require("../task/task")


const Milestone = mongoose.model("Milestone", {
  name: {
    type: String,
    trim: true,
    required: true,
  },
  hash: {
    // another tool for versioning
    type: String,
  },
  description: {
    type: String,
    maxlength: 2000,
    trim: true,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  tasks: [{
    type: taskSchema
  }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  // Add a submited flag
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Milestone;
