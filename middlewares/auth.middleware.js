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
    if (req.path === "/posts/") {
      next();
    } else {
      res.send({ msg: "Please login first." });
    }
  }
};

module.exports = { auth };
