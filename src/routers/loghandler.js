const express = require("express");
const router = new express.Router();
const Organization = require("../models/users/organization");
const Individual = require("../models/users/individual");

router.post("/login", async (req, res) => {
 
  try {
    
    let organization = await Organization.findByCredentialsNoError(
      req.body.name,
      req.body.passkey
    );
    
    if (organization) {
      const token = await organization.generateAuthToken();

      // Hide Passkey and Tokens hashes
      delete organization._doc.passkey;
      delete organization._doc.tokens;
      // organization.type = "organization";

      await res.send({ organization, token, accountType: "organization" });
      return;
    }

    let individual = await Individual.findByCredentialsNoError(
      req.body.name,
      req.body.passkey
    );

    if (individual) {
      const token = await individual.generateAuthToken();

      // Hide Passkey and Tokens hashes
      delete individual._doc.passkey;
      delete individual._doc.tokens;
      // individaul.type = "individaul";

      await res.send({ individual, token, accountType: "individaul" });
      return;
    }
    res.status(400).send(e);
  } catch (e) {
    res.status(400).send("Error: " + e);
  }
});

module.exports = router;
