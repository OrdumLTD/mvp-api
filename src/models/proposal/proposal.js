const mongoose = require("mongoose");
const validator = require("validator");

const tldrSchema = mongoose.Schema({
  teamAccount: {
    type: String,
    required: true,
    trim: true,
  },
  projectType: {
    type: [String],
    required: true,
    trim: true,
  },
  contact: {
    type: String,
    required: true,
    trim: true,
  },
  startDate: {
    type: Date,
    required: true,
    trim: true,
  },
  fundingAmmount: {
    type: Number,
    required: true,
    trim: true,
  },
  deliveryDeadline: {
    type: Date,
    required: true,
    trim: true,
  },
  shortDescription: {
    type: String,
    required: true,
    trim: true,
  },
  // validate
  externalLinks: {
    type: [String],
    required: true,
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

const teammembers = mongoose.Schema({
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
    required: true,
  },
  tldr: {
    type: tldrSchema,
  },
  context: {
    type: contextSchema,
  },
  teammembers: {
    // ref to teammbers
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    // TODo add reff to Individual
    ref: "Organization",
  },
  milestones: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Milestone",
  }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Proposal = mongoose.model("Proposal", proposalSchema);

module.exports = Proposal;
