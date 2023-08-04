const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const LinksSchema = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    maxLength: 150,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  discord: {
    type: String,
    trim: true,
    lowercase: true,
    maxLength: 150,
  },
  twitter: {
    type: String,
    trim: true,
    lowercase: true,
    maxLength: 150,
  },
  matrix: {
    type: String,
    trim: true,
    lowercase: true,
    maxLength: 150,
  },
  website: {
    type: String,
    trim: true,
    lowercase: true,
    maxLength: 150,
  },
  git: {
    type: String,
    trim: true,
    lowercase: true,
    maxLength: 150,
  },
});

const PorjectTypeSchema = new Schema({
  projects: {
    type: [String],
    maxlength: 100,
    trim: true,
  },
});

const BlockchainSchema = new Schema({
  blockchains: {
    type: [String],
    maxlength: 100,
    trim: true,
  },
});

const organizationSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
  },
  passkey: {
    type: String,
    trim: true,
    require: true,
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
  // about: {
  //   type: String,
  //   maxLength: 2000,
  //   trim: true,
  // },
  // mission: {
  //   type: String,
  //   maxLength: 2000,
  //   trim: true,
  // },
  // projectType: {
  //   type: [PorjectTypeSchema],
  //   default: {},
  // },
  // blockchain: {
  //   type: [BlockchainSchema],
  //   default: {},
  // },
  // links: {
  //   type: LinksSchema,
  //   default: {},
  // },
  // team: {
  //   //
  //   // { name: refToIndividual, teamRole: enum(SUDO, ADMIN, REGULAR) }
  //   //
  //   //Existing individual account + type of user - sudo, admin, regular
  // },
  avatar: {},
  banner: {},
});

organizationSchema.virtual("proposals", {
  ref: "Proposal",
  localField: "_id",
  foreignField: "owner",
});

organizationSchema.virtual("milestones", {
  ref: "Milestones",
  localField: "_id",
  foreignField: "milesotones",
});

organizationSchema.methods.getPublicProfile = async function () {
  const organization = this;
  const organizationObject = organization.toObject();

  delete organizationObject.passkey;
  delete organizationObject.tokens;

  return organizationObject;
};

organizationSchema.methods.generateAuthToken = async function () {
  const organization = this;

  const token = jwt.sign(
    { _id: organization._id.toString() },
    "this is a big secret"
  );

  organization.tokens = organization.tokens.concat({ token: token });
  await organization.save();

  return token;
};

organizationSchema.statics.findByCredentials = async (name, passkey) => {
  const organization = await Organization.findOne({ name });

  if (!organization) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(passkey, organization.passkey);

  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return organization;
};

// Hashing Passkey
organizationSchema.pre("save", async function (next) {
  const organization = this;

  if (organization.isModified("passkey")) {
    organization.passkey = await bcrypt.hash(organization.passkey, 10);
  }

  next();
});

const Organization = mongoose.model("Organization", organizationSchema);

module.exports = Organization;
