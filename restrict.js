const bcyrpt = require("bcryptjs");
const db = require("./dbModle");

function restrict() {
  return async (req, res, next) => {
    const authError = { messeage: "Missing or invalid information" };

    try {
      const { username, password } = req.headers;

      if (!username || !password) {
        return res.status(401).json(authError);
      }
      console.log("checkpoint 1 cleared");

      const user = await db.findBy({ username }).first();
      if (!user) {
        return res.status(401).json(authError);
      }
      console.log("checkpoint 2 cleared");

      const passwordValid = await bcyrpt.compare(password, user.password);
      if (!passwordValid) {
        return res.status(401).json(authError);
      }
      console.log("checkpoint 3 cleared");

      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = restrict;
