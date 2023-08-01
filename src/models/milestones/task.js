const mongoose = require("mongoose");

const Task = mongoose.model("Task", {
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
  type: {
    type: String,
  },
  deadline: {
    type: Date,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    
  },
});

module.exports = Task;
