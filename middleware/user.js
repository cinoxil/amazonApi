module.exports.userMw = {
  create: (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return res.sendStatus(400);
    next();
  },
  update: (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return res.sendStatus(400);
    next();
  },
  delete: (req, res, next) => {
    const { email } = req.body;
    if (!email || email == "admin") return res.sendStatus(400);
    next();
  },
};
