const jwt = require("jsonwebtoken");
const Organization = require("../models/users/organization");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "this is a big secret");
    const organization = await Organization.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!organization) {
      throw new Error();
    }

    // Hide Passkey and tokens hashes
    delete organization._doc.passkey;
    delete organization._doc.tokens;

    req.token = token;
    req.organization = organization;

    next();
  } catch (e) {
    res.status(401).send({ error: "Provide proper authentification!" });
  }
};

module.exports = auth;
