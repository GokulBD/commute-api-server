const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  username: String,
  password: String
});
const User = mongoose.model("User", userSchema);

router.post("/signup", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, saltRounds);
    await mongoose.connect(process.env.MONGODB_URI);
    const newUser = new User({ username, password: hash });
    newUser.save();
    res.status(200).json({ message: "signup successfull" });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    await mongoose.connect(process.env.MONGODB_URI);
    const results = await User.find({ username });
    if (results.length) {
      const hash = results[0].password;
      const isMatch = await bcrypt.compare(password, hash);
      if (isMatch) res.status(200).json({ message: "login  successfull" });
      else res.status(400).json({ message: "wrong password" });
    } else {
      res.status(400).json({ message: "username not found" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
