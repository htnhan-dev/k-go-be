const router = require("express").Router();
const chatController = require("../controllers/chatController");

router.post("/", chatController.createdChat);

router.get("/:userId", chatController.getUser);

router.get("/find/:firstId/:secondId", chatController.getChat);

module.exports = router;
