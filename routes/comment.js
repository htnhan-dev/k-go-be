const router = require("express").Router();
const commentController = require("../controllers/commentController");

router.post("/", commentController.addComment);

router.get("/", commentController.getComment);

module.exports = router;
