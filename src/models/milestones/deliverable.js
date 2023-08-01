const mongoose = require("mongoose");

const Deliverable = mongoose.model("Deliverable", {
  name: {
    type: String,
    trim: true,
  },
  link: {
    type: String,
    trim: true,
  },
});

module.exports = Deliverable;
