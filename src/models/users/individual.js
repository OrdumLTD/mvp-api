const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("Organization", {
  name: {
    type: String,
    trim: true,
  },
  id: {
    //onchain ID for version
    type: String,
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
    require: true,
    minlength: 8,
  },
  bio: {
    type: String,
    trim: true,
  },
  mission: {
    type: String,
    trim: true,
  },
  proposals: {
    // Ref to proposal
  },
  links: {
    // Array of 6 liks
  },
  skills: {
    // array of Skills
  },
  avatar: {},
  banner: {},
});

module.exports = User;
