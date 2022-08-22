const router = require("express").Router();
const promotionController = require("../controllers/promotionController");

router.post("/", promotionController.addPromotion);

router.get("/", promotionController.getPromotion);

module.exports = router;
