const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const individualSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  passkey: {
    type: String,
    trim: true,
    required: true,
    minlength: 8,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
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
  // passkey: {
  //   type: String,
  //   trim: true,
  //   required: true,
  //   minlength: 8,
  // },
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

individualSchema.methods.getPublicProfile = async function () {
  const individual = this;
  const individualObject = individual.toObject();

  delete individualObject.passkey;
  delete individualObject.tokens;

  return individualObject;
};

individualSchema.methods.generateAuthToken = async function () {
  const individual = this;

  const token = jwt.sign(
    { _id: individual._id.toString() },
    "this is a big secret"
  );

  individual.tokens = individual.tokens.concat({ token: token });
  await individual.save();

  individualSchema.statics.findByCredentials = async (name, passkey) => {
    const individual = await Individaul.findOne({ name });

    if (!individual) {
      throw new Error("Unable to login");
    }

    const isMatch = await bcrypt.compare(passkey, individual.passkey);

    if (!isMatch) {
      throw new Error("Unable to login");
    }
    return individual;
  };

  return token;
};

individualSchema.pre("save", async function (next) {
  const individual = this;

  if (individual.isModified("passkey")) {
    individual.passkey = await bcrypt.hash(individual.passkey, 10);
  }

  next();
});

const Individaul = mongoose.model("Individual", individualSchema);

module.exports = Individaul;
