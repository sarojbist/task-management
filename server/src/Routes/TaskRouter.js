const addtask = require("../Controllers/TaskController/addTask");
const deleteTask = require("../Controllers/TaskController/deleteTask");
const getTaskById = require("../Controllers/TaskController/gettaskById");
const getTasks = require("../Controllers/TaskController/getTasks");
const updateTask = require("../Controllers/TaskController/updateTask");

const router = require("express").Router();

router.post("/add-task", addtask);
router.get("/get-tasks", getTasks); // send query like ?page=1&limit=5
router.get("/get-task/:id", getTaskById);
router.put("/update-task/:id", updateTask);
router.delete("/delete-task/:id", deleteTask);

module.exports = router;