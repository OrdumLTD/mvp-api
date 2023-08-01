const mongoose = require("mongoose");

const Milestone = mongoose.model("Milestone", {
  name: {
    type: String,
    trim: true,
  },
  id: {
    //onchain ID for version
    type: String,
  },
  hash: {
    // another tool for versioning
    type: String,
  },
  deadline: {
    type: Date,
  },
  description: {
    type: String,
    trim: true,
  },
  tasks: {
    // List ot task
  },
});

module.exports = Milestone;
