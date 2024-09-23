const axios = require("axios");

const getPublicKey = async () => {
  try {
    const jwksUrl =
      "https://dev-o5lhiqub0sina11x.us.auth0.com/.well-known/jwks.json";
    const response = await axios.get(jwksUrl);
    const keys = response.data.keys;

    // Extract the public key based on your requirements
    const publicKey = keys[0].x5c[0]; // Choose the appropriate key based on your use case
    console.log(publicKey, "publicKey<<")
    return publicKey;
  } catch (error) {
    console.error("Error fetching public key:", error);
    throw error;
  }
};

module.exports = { getPublicKey };
