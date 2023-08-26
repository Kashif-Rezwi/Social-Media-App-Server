const express = require("express");
const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginRouter = express.Router();

// user login
loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ where: { email: email } });

    if (userExists) {
      bcrypt.compare(password, userExists.password, async (err, result) => {
        if (result) {
          const token = jwt.sign({ UserID: userExists.id }, "social-media-app");
          res.send({
            status: "User signin successfully.",
            ...userExists.dataValues,
            token,
          });
        } else {
          return res.send({ status: "Wrong Credentials!" });
        }
      });
    } else {
      res.send({ status: "User not exists!" });
    }
  } catch (err) {
    res.send({ error: err.message });
  }
});

module.exports = { loginRouter };
