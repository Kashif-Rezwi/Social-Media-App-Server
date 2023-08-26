const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "social-media-app", (err, decoded) => {
      if (decoded) {
        req.body.user_id = decoded.UserID;
        next();
      } else {
        res.send({ msg: err.message });
      }
    });
  } else {
    if (
      ((req.path === "/posts" || req.path === "/posts/") &&
        req.method === "GET") ||
      (/^\/posts\/\w+$/i.test(req.path) && req.method === "GET") ||
      req.path === "/users/" ||
      req.path === "/users/email-verification" ||
      req.path === "/login"
    ) {
      next();
    } else {
      res.send({ msg: "Please login first." });
    }
  }
};

module.exports = { auth };
