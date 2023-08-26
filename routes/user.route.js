const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models/user.model");
const { Email_verification } = require("../models/email_verification.model");
const { generateOTP } = require("../utils/generateOTP");
const { sendEmails } = require("../utils/sendEmails");
const userRouter = express.Router();

// creating new user
userRouter.post("/", async (req, res) => {
  const { email, ...rest } = req.body;

  try {
    const userExists = await User.findOne({ where: { email: email } });
    if (userExists) {
      return res.send({ msg: "User already exists!" });
    }

    const otp = generateOTP();
    const emailVerification = await sendEmails({ email, otp });

    if (emailVerification === undefined) {
      return res.send("Invalid recipients email id!");
    }

    await Email_verification.create({
      email,
      otp,
      ...rest,
    });

    res.send({
      msg: "User verification OTP sent successfully.",
      userDetails: {
        email,
        otp,
        ...rest,
      },
    });
  } catch (err) {
    res.send({ error: err.message });
  }
});

// verifying new user
userRouter.post("/email-verification", async (req, res) => {
  const { email, password, otp, ...rest } = req.body;

  try {
    const userExists = await Email_verification.findOne({
      where: { email: email },
    });

    if (userExists) {
      if (userExists.otp == Number(otp)) {
        bcrypt.hash(password, 5, async (err, hash) => {
          if (err) {
            return res.send({ error: err.message });
          }
          // Create the user in the Users table
          await User.create({ email, password: hash, ...rest });

          // Delete the verification entry
          await Email_verification.destroy({ where: { email: email } });

          res.send({
            msg: "User verification successfully.",
            status: true,
            userDetails: { email, password: hash, ...rest },
          });
        });
      } else {
        res.send({ status: false, msg: "User verification failed." });
      }
    } else {
      res.send({ status: false });
    }
  } catch (err) {
    res.send({ error: err.message });
  }
});

// getting user by id
userRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const userData = await User.findByPk(id);

    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching the user" });
  }
});

// deleting a user
userRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const userData = await User.findByPk(id);

    if (!userData) {
      return res.status(403).json("User is not found!");
    }

    await userData.destroy();

    return res.json("User has been deleted!");
  } catch (err) {
    return res.status(500).json("An error occurred while deleting the user.");
  }
});

// updating a user
userRouter.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const userData = await User.findByPk(id);

    if (!userData) {
      return res.status(403).json("User is not found!");
    }

    const { name, bio, image, updated_at } = req.body;

    userData.name = name;
    userData.bio = bio;
    userData.image = image;
    userData.updated_at = updated_at;

    await userData.save();

    return res.json("User has been updated.");
  } catch (err) {
    return res.status(500).json("An error occurred while updating the user.", {
      error: err.message,
    });
  }
});

module.exports = { userRouter };
