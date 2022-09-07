const express = require("express");
const app = express();
const api = require("./controller/api");
const { authController } = require("./controller/auth");
var cors = require("cors");
const { auhtMw } = require("./middleware/auth");
const { userMw } = require("./middleware/user");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.post("/login", auhtMw.signIn, authController.signIn);
app.post("/asins", auhtMw.authenticated, api.getDataFromApi);
app
  .route("/users", auhtMw.authenticated, auhtMw.isSuperUser)
  .get(authController.get)
  .post(userMw.create, authController.create)
  .put(userMw.update, authController.update);
app.post(
  "/users/:email",
  auhtMw.authenticated,
  auhtMw.isSuperUser,
  authController.delete
);
app.listen(3000, () => {
  console.log(`3000 port'undan server ayaga kaldirildi`);
});
