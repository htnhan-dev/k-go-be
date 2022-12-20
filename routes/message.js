const messageController = require("../controllers/messageController");

const router = require("express").Router();

router.post("/", messageController.addMessage);

router.get("/:chatId", messageController.getMessage);

module.exports = router;
