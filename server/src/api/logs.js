//Router with multiple routes for interacting with our LogEntry store

const { Router } = require("express");
const LogEntry = require("../models/LogEntry");
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const entries = await LogEntry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

router.get("/:logId", async (req, res) => {
  try {
    const log = await LogEntry.findById(req.params.logId);
    res.json(log);
  } catch (error) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(422);
    }
    next(error);
  }

  console.log(req.body);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const removedLog = await LogEntry.remove({ _id: req.params.id });
    res.json(removedLog);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
