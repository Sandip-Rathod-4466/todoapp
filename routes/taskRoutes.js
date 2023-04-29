const { getAllTask, addNewTask, removeATask } = require("../controllers/taskController");
const router = require("express").Router();

router.get("/all/:id",getAllTask);
router.post("/new",addNewTask);
router.delete("/:id",removeATask);





module.exports = router;