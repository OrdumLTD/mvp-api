const express = require("express");
const router = new express.Router();
const Proposal = require("../models/proposal/proposal");
const auth = require("../middleware/organizationAuth");

//Get a list of IDs instead of all the docs
router.get("/proposalsids", async (req, res) => {
  res.send("ok");
});

//Get proposals by ID
router.get("/proposals/:id", async (req, res) => {
  res.send("ok");
});

router.post("/proposals", auth, async (req, res) => {

  const proposal = new Proposal({
    ...req.body,
    owner: req.organization._id,
  });

  try {
    await proposal.save();
    res.status(201).send(proposal);
  } catch (e) {
    res.status(500).send(e);
  }
});



module.exports = router;
