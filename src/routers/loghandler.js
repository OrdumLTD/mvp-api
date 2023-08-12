const express = require("express");
const router = new express.Router();
const Organization = require("../models/users/organization");
const Individaul = require("../models/users/individual");

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

    let individaul = await Individaul.findByCredentialsNoError(
      req.body.name,
      req.body.passkey
    );

    if (individaul) {
      const token = await individaul.generateAuthToken();

      // Hide Passkey and Tokens hashes
      delete individaul._doc.passkey;
      delete individaul._doc.tokens;
      // individaul.type = "individaul";

      await res.send({ individaul, token, accountType: "individaul" });
      return;
    }
    res.status(400).send(e);
  } catch (e) {
    res.status(400).send("Error: " + e);
  }
});

module.exports = router;
