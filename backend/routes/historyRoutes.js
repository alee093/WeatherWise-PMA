const express = require("express");
const router = express.Router();

const controller = require("../controllers/historyController");

router.get("/", controller.get);
router.post("/", controller.add);
router.delete("/:id", controller.remove);

module.exports = router;