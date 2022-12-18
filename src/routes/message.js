const router = require("express").Router();
const messageController = require("../controllers/messageController");
router.post("/add", messageController.addMessage);
router.post("/get", messageController.getMessage);

module.exports = router;
