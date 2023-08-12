const express = require("express");
const router = new express.Router();
const Proposal = require("../models/proposal/proposal");
const Milestone = require("../models/milestones/milestone");
const auth = require("../middleware/organizationAuth");

//Get a list of IDs instead of all the docs
router.get("/proposalsids", async (req, res) => {
  res.send("ok");
});

//Get proposals by ID
router.get("/proposals/:id", async (req, res) => {
  const id = req.params.id;
  // const proposal = await Proposal.findById(id);

  // if (!proposal) {
  //   res.status(404).send();
  // }
  // await proposal.populate("milestones");
  try {
    const proposal = await Proposal.findById(id);

    if (!proposal) {
      res.status(404).send();
    }
    await proposal.populate("milestones");

    res.send(proposal);
  } catch (e) {
    res.status(500).send();
  }
});

// get milestones from prop by id

router.get("");

//Submit proposal to DB
router.post("/proposals", auth, async (req, res) => {

  // get a list of milesones
  const milestones = req.body.milestones;
  try {
  // submitmilstoens to db and get IDs
  const addMilestones = async (milestones) => {
    const result = await milestones.map(async (item) => {
      const milestone = new Milestone(item);
      await milestone.save();
      return milestone._id;
    });
    return await Promise.all(result);
  };

  // store Milestones ID for references
  let milestoneIds = [];

  // add milestones to DB
  if (milestones !== undefined) {
    milestoneIds = await addMilestones(milestones);
  }

  const proposal = new Proposal({
    ...req.body,
    owner: req.organization._id,
    milestones: milestoneIds,
  });

  await proposal.populate("milestones");

  
    await proposal.save();
    res.status(201).send(proposal);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
``;
