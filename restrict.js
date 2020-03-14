const bcyrpt = require("bcryptjs");
const db = require("./dbModle");

// const sessions = {};

function restrict() {
  return async (req, res, next) => {
    const authError = { messeage: "Missing or invalid information" };

    try {
      if (!req.session || !req.session.user) {
        return res.status(401).json(authError);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = { restrict };
