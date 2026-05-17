const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const notes = await Notes.find({ user: userId });
    res.json(notes);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Title must be at least 3 characters").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    try {
      const userId = req.user.id;
      const { title, description, tag } = req.body;
      const note = new Notes({
        user: userId,
        title,
        description,
        tag,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  },
);

router.put("/updatenote/:id", fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        const newNote = {};
        if (title) newNote.title = title;
        if (description) newNote.description = description;
        if (tag) newNote.tag = tag;

        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ error: "Not authorized" });
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
});

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ error: "Not authorized" });
        }
        await Notes.findByIdAndDelete(req.params.id);
        res.json({ message: "Note deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
});

module.exports = router;
