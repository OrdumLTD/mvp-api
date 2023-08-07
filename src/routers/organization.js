const express = require("express");
const router = new express.Router();
const Organization = require("../models/users/organization");
const Milestone = require("../models/milestones/milestone")
const auth = require("../middleware/organizationAuth");

//get public profile
router.get("/organizations/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const organization = await Organization.findOne({ _id: id });

    if (!organization) {
      throw new Error();
    }

    // console.log();
    organization.getPublicProfile();
    const toSend = await organization.getPublicProfile();
    res.send({ organization: toSend });
  } catch (e) {
    res.status(404).send();
  }
});

//get a list of proposals
router.get("/organizations/:id/proposals", async (req, res) => {
  try {
    const id = req.params.id;
    const organization = await Organization.findOne({ _id: id });

    if (!organization) {
      throw new Error();
    }

    await organization.populate("proposals");
    res.send(organization.proposals);

  } catch (e) {
    res.status(500).send();
  }
});

//get current profile
router.get("/organizations/me", auth, async (req, res) => {
  res.send(req.organization);
});

//Log in
router.post("/organizations/login", async (req, res) => {
  try {
    let organization = await Organization.findByCredentials(
      req.body.name,
      req.body.passkey
    );

    const token = await organization.generateAuthToken();

    // Hide Passkey and Tokens hashes
    delete organization._doc.passkey;
    delete organization._doc.tokens;

    await res.send({ organization, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

//Log Out from one device
router.post("/organizations/logout", auth, async (req, res) => {
  try {
    // console.log(req.organization.tokens)
    req.organization.tokens = req.organization.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.organization.save();

    req.send("Logge out from current device");
  } catch (e) {
    res.status(500).send(e);
  }
});

//Log Out from all devices
router.post("/organizations/logoutAll", auth, async (req, res) => {
  try {
    // console.log(req.organization.tokens)
    req.organization.tokens = [];

    await req.organization.save();

    req.send("Logged out from all");
  } catch (e) {
    res.status(500).send(e);
  }
});

// Creating an organizatin! Sign in!
router.post("/organizations", async (req, res) => {
  const organization = new Organization(req.body);

  try {
    const { email, name } = req.body;

    // let userWithSameEmail = await Organization.findOne({ email });
    let userWithSameName = await Organization.findOne({ name });

    // if (userWithSameEmail)
    //   return res.status(400).send("Email is already registered.");
    if (userWithSameName) return res.status(400).send("User name is taken.");

    const token = await organization.generateAuthToken();

    await organization.save();

    const toSend = await organization.getPublicProfile();

    res.status(201).send({ toSend, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

//Log out

module.exports = router;
