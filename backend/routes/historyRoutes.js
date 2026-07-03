const express = require("express");
const router = express.Router();

const controller = require("../controllers/historyController");

router.get("/", controller.get);
router.post("/", controller.add);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;