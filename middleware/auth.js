const config = require("config");
const jwt = require("jsonwebtoken");
const { getPublicKey } = require("../utils/getPublicKey");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Accedd denied. No token provided!");
  try {
    const decode = jwt.verify(token, config.get("jwtPrivateKey"));
    res.user = decode;
    next();

    // auth0
    // getPublicKey()
    //   .then((publicKey) => {
    //     // console.log(publicKey, "publicKey");
    //     jwt.verify(token, publicKey, (err, decoded) => {
    //       if (err) {
    //         console.log(err, "<<")
    //         return res.sendStatus(401);
    //       }
    //       req.user = decoded;
    //       next();
    //     });
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching public key:", error);
    //     return res.sendStatus(500); // or handle the error appropriately
    //   });
  } catch (err) {
    res.status(400).send("Invalid token provided!");
  }
};

module.exports = auth;
