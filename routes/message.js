const messageController = require("../controllers/messageController");
const upload = require("../middleware/upload");
const router = require("express").Router();

router.post("/", upload.any(), messageController.addMessage);

router.get("/:chatId", messageController.getMessage);

module.exports = router;
