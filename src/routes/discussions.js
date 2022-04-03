const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const discussionSchema = mongoose.Schema({
  topic: String,
  description: String
});
const Discussion = mongoose.model("Discussion", discussionSchema);

router.get("/", async (req, res, next) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const results = await Discussion.find({});
    res.status(200).json({ results });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const result = await Discussion.findById(req.params.id);
    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const newDiscussions = new Discussion(req.body);
    newDiscussions.save();
    res.status(200).json({ message: "added successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
