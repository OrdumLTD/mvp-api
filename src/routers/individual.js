const express = require("express");
const router = new express.Router();
const Individual = require("../models/users/individual");
const auth = require("../middleware/individualAuth");


router.get("/individuals/test", async (req, res) => {
  try {
    res.send("ok")
    
  } catch (e) {
    res.status(404).send();
  }
});

//get public profile
router.get("/individuals/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const individual = await Individual.findOne({ _id: id });

    if (!individual) {
      throw new Error();
    }

    individual.getPublicProfile();
    const toSend = await Individual.getPublicProfile();
    res.send({ individual: toSend });
  } catch (e) {
    res.status(404).send();
  }
});

//get a list of proposals
router.get("/individuals/:id/proposals", async (req, res) => {
  try {
    const id = req.params.id;
    const individual = await Individual.findOne({ _id: id });

    if (!individual) {
      throw new Error();
    }

    await individual.populate("proposals");
    res.send(individual.proposals);

  } catch (e) {
    res.status(500).send();
  }
});

//get current profile
router.get("/individuals/me", auth, async (req, res) => {
  res.send(req.individual);
});

//Log in
router.post("/individuals/login", async (req, res) => {
  try {
    let individual = await individual.findByCredentials(
      req.body.name,
      req.body.passkey
    );

    const token = await individual.generateAuthToken();

    // Hide Passkey and Tokens hashes
    delete individual._doc.passkey;
    delete individual._doc.tokens;

    await res.send({ individual, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

//Log Out from one device
router.post("/individuals/logout", auth, async (req, res) => {
  try {
    // console.log(req.individual.tokens)
    req.individual.tokens = req.individual.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.individual.save();

    req.send("Logge out from current device");
  } catch (e) {
    res.status(500).send(e);
  }
});

//Log Out from all devices
router.post("/individuals/logoutAll", auth, async (req, res) => {
  try {
    // console.log(req.individual.tokens)
    req.individual.tokens = [];

    await req.individual.save();

    req.send("Logged out from all");
  } catch (e) {
    res.status(500).send(e);
  }
});

// Creating an individual! Sign in!
router.post("/individuals", async (req, res) => {
  const individual = new Individual(req.body);

  try {
    const { email, name } = req.body;

    // let userWithSameEmail = await individual.findOne({ email });
    let userWithSameName = await Individual.findOne({ name });

    // if (userWithSameEmail)
    //   return res.status(400).send("Email is already registered.");
    if (userWithSameName) return res.status(400).send("The name is taken.");

    const token = await individual.generateAuthToken();

    await individual.save();

    const toSend = await individual.getPublicProfile();

    res.status(201).send({ toSend, token, accountType: "individual" });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
