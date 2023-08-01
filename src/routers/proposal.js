const express = require("express");
const router = new express.Router();
const Proposal = require("../models/proposal/proposal");
const auth = require("../middleware/organizationAuth");

router.post("/proposals", auth, async (req, res) => {
  //   const proposal = new Proposal(req.body);

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

router.get("/test", async (req, res) => {
  res.send("ok");
});

module.exports = router;
