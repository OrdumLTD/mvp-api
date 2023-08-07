const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  type: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  assignMembers: [
    {
      type: {
        // If empty - the them member is not registered with ordum
        address: {
          type: String,
          default: "",
        },
        name: {
          type: String,
          required: true,
        },
      },
    },
  ],
  cost: {
    type: {
      hours: {
        type: Number,
      },
      costPerHour: {
        type: Number,
      },
    },
  },
  deadline: {
    type: Date,
    required: true
  },
  deliverable: {
    type: {
        name: {
            type: String
        },
        link: {
            type: String
        }
    }
  }
});

const Task = mongoose.model("Task", taskSchema);


// exports.default = Task;

module.exports = { taskSchema, Task }

