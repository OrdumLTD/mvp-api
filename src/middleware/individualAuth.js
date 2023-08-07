const jwt = require("jsonwebtoken");
const Individual = require("../models/users/individual");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "this is a big secret");
    const individual = await Individual.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!individual) {
      throw new Error();
    }

    // Hide Passkey and tokens hashes
    delete individual._doc.passkey;
    delete individual._doc.tokens;

    req.token = token;
    req.individual = individual;

    next();
  } catch (e) {
    res.status(401).send({ error: "Provide proper authentification!" });
  }
};

module.exports = auth;
