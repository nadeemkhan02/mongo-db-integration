const express = require("express");
const cors = require("cors");
const user = require("./routes/users");
const auth = require("./routes/auth");
const config = require("config");
const mongoose = require("mongoose");
const { auth: openidAuth } = require("express-openid-connect");
const { getPublicKey } = require("./utils/getPublicKey");
const app = express();

if (!config.get("jwtPrivateKey")){
   console.log("FETAL:ERROR: jwt private key is not set!")
   process.exit(1);
}

const configValue = {
  authRequired: false,
  auth0Logout: true,
  secret: "tHisIsNadEemKhaNsSecrAteKeY",
  baseURL: "http://localhost:3000",
  clientID: "hxHdTgRHwuaqcr4v0BM2BPFDYuGPJWf0",
  issuerBaseURL: "https://dev-o5lhiqub0sina11x.us.auth0.com",
};
const authConfig = {
  authRequired: configValue.authRequired,
  auth0Logout: configValue.auth0Logout,
  secret: configValue.secret,
  baseURL: configValue.baseURL,
  clientID: configValue.clientID,
  issuerBaseURL: configValue.issuerBaseURL,
  routes: {
    login: false, // Disable default login route
  },
};

const corsOptions = {
  exposedHeaders: ["Authorization", "x-auth-token"],
};

app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/user", user);
app.use("/api/auth", auth);
// app.use(openidAuth(authConfig));
// getPublicKey()
//   .then((publicKey) => {
//     console.log(publicKey, "<<");
//   //   jwt.verify(accessToken, publicKey, (err, decoded) => {
//   //     if (err) {
//   //       return res.sendStatus(401);
//   //     }

//   //     req.user = decoded;
//   //     next();
//   //   });
//   })
//   .catch((error) => {
//     console.error("Error fetching public key:", error);
//     // return res.sendStatus(500); // or handle the error appropriately
//   });

mongoose
  .connect("mongodb://localhost/auth-project")
  .then(() => {
    console.log("mongodb connected successfully");
  })
  .catch((e) => {
    console.log("Error", e);
  });

const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
