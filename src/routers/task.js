const express = require("express");
const router = new express.Router();
const Task = require("../models/task/task");
// const auth = require("../middleware/organizationAuth");

router.get("/tasks", async (req, res) => {
  try {
    res.send("ok");
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  console.log(task);
  try {
    await task.save()
    res.status(201).send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
