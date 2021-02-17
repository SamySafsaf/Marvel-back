const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const User = require("../models/User");

router.post("/user/signup", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.fields.email });

    if (!user) {
      if (req.fields.email && req.fields.username && req.fields.password) {
        const salt = uid2(64);
        const hash = SHA256(req.fields.password + salt).toString(encBase64);
        const token = uid2(64);

        const newUser = new User({
          email: req.fields.email,
          username: req.fields.username,
          token: token,
          salt: salt,
          hash: hash,
        });

        await newUser.save();
        res.status(200).json({
          _id: newUser._id,
          token: newUser.token,
          username: newUser.username,
        });
      } else {
        res.status(400).json({ message: "Missing parameters" });
      }
    } else {
      res.status(400).json({ message: "This email already has an account" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
