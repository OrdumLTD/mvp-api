const express = require("express");
const router = new express.Router();
const Milestone = require("../models/milestones/milestone");
// const auth = require("../middleware/organizationAuth");

router.get("/test", async (req, res) => {
  try {
    res.send({ msg: "Alive" });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/milestones", async (req, res) => {
  try {
    res.send("list of milestones");
  } catch (e) {
    res.status(500).send(e);
  }
});

//Get a Milestone by ID
router.get("/milestones/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const milesotone = await Milestone.findById(id);

    if (!milesotone) {
      res.status(404).send();
    }

    res.send(milesotone);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/milestones", async (req, res) => {
  const milestone = new Milestone(req.body);
  // console.log(milestone);
  try {
    await milestone.save();
    res.status(201).send(milestone);
  } catch (e) {
    res.status(500).send(e);
  }
});

// //Submit milestone to DB
// router.post("/milestones", auth, async (req, res) => {

//     const milestone = new Milestone({
//       ...req.body,
//       owner: req.organization._id,
//     });

//     try {
//       await milestone.save();
//       res.status(201).send(milestone);
//     } catch (e) {
//       res.status(500).send(e);
//     }
//   });

module.exports = router;
