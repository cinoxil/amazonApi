const { verifyToken } = require("../helper/jwt");

module.exports.auhtMw = {
  signIn: (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return res.sendStatus(400);
    next();
  },
  authenticated: (req, res, next) => {
    const authHeader = req.headers.authorization;

    authHeader
      ? verifyToken(authHeader.split(" ")[1], process.env.ACCESS_SECRET_KEY)
          .then((result) => {
            result
              ? (() => {
                  res.locals.user = result;
                  next();
                })()
              : res.sendStatus(403);
          })
          .catch((error) => {
            res.status(500).send(error);
          })
      : res.sendStatus(403);
  },
  isSuperUser: (req, res, next) => {
    if (res.locals.user.email != "admin") return res.sendStatus(403);
    next();
  },
};
