const express = require("express");
const router = new express.Router();
const  { Task }  = require("../models/task/task");
// const auth = require("../middleware/organizationAuth");

router.get("/tasks", async (req, res) => {
  try {
    res.send("ok");
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/tasks", async (req, res) => {
  // console.log(Task);
  const task = new Task(req.body);
  try {
    await task.save()
    res.status(201).send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
