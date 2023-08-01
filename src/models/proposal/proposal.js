const mongoose = require("mongoose");
const validator = require("validator");

const tldrSchema = mongoose.Schema({
  teamAccount: {
    type: String,
    require: true,
    trim: true,
  },
  projectType: {
    type: String,
    require: true,
    trim: true,
  },
  contact: {
    type: String,
    require: true,
    trim: true,
  },
  startDate: {
    type: Date,
    require: true,
    trim: true,
  },
  fundingAmmount: {
    type: Number,
    require: true,
    trim: true,
  },
  deliveryDeadline: {
    type: Date,
    require: true,
    trim: true,
  },
  shortDescription: {
    type: String,
    require: true,
    trim: true,
  },
  // validate
  externalLinks: {
    type: [String],
    require: true,
    trim: true,
  },
});

const contextSchema = mongoose.Schema({
  context: {
    type: String,
    trim: true,
  },
  knownBackups: {
    type: String,
    trim: true,
  },
  problemStatement: {
    type: String,
    trim: true,
  },
  solution: {
    type: String,
    trim: true,
  },
  ksmImprovements: {
    type: String,
    trim: true,
  },
  targetAudience: {
    type: String,
    trim: true,
  },
  whyKSM: {
    type: String,
    trim: true,
  },
  similarSolution: {
    type: String,
    trim: true,
  },
});

const teammebers = mongoose.Schema({
  ordumID: {
    type: String,
  },
  // If there it's a teammeber outside of ORDUM
  name: {
    type: String,
  },
  role: {
    type: String,
  },
  adminStatus: {
    type: String,
    enum: ["SUDO", "ADMIN", "REGULAR"],
    default: "REGULAR",
  },
});

const proposalSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    require: true,
  },
  tldr: {
    type: tldrSchema,
  },
  context: {
    type: contextSchema,
  },
  milestones: {
    // ref to milestones
  },
  teammembers: {
    // ref to teammbers
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Organization'
  },
});

const Proposal = mongoose.model("Proposal", proposalSchema);

module.exports = Proposal;
