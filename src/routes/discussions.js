const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const discussionSchema = mongoose.Schema({
  username: String,
  topic: String,
  description: String
});
const Discussion = mongoose.model("Discussion", discussionSchema);

const commentSchema = mongoose.Schema({
  discussionId: String,
  message: String
});
const Comment = mongoose.model("Comment", commentSchema);

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

router.post("/comment", async (req, res, next) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const comment = new Comment(req.body);
    comment.save();
    res.status(200).json({ message: "added successfully" });
  } catch (error) {
    next(error);
  }
});

router.get("/comment/:id", async (req, res, next) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const results = await Comment.find({ discussionId: req.params.id });
    res.status(200).json({ results });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
