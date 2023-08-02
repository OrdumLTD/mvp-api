const express = require("express");
const router = new express.Router();
const Milestone = require("../models/milestones/milestone");
// const auth = require("../middleware/organizationAuth");

router.get("/milestones", async (req, res) => {
  try {
    res.send("list of milestones");
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/milestones", async (req, res) => {
  const milestone = new Milestone(req.body);
  console.log(milestone);
  try {
    await milestone.save()
    res.status(201).send(milestone);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
