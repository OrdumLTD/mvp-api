const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("Organization", {
  name: {
    type: String,
    trim: true,
    required: true,
  },
  // email: {
  //   type: String,
  //   trim: true,
  //   lowercase: true,
  //   validate(value) {
  //     if (!validator.isEmail(value)) {
  //       throw new Error("Email is invalid");
  //     }
  //   },
  // },
  passkey: {
    type: String,
    trim: true,
    required: true,
    minlength: 8,
  },
  // bio: {
  //   type: String,
  //   trim: true,
  // },
  // mission: {
  //   type: String,
  //   trim: true,
  // },
  // proposals: {
  //   // Ref to proposal
  // },
  // links: {
  //   // Array of 6 liks
  // },
  // skills: {
  //   // array of Skills
  // },
  // previousWork:{
  //   // array of Jobs
  // },
  avatar: {},
  banner: {},
});

module.exports = User;
