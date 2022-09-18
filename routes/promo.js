const router = require("express").Router();
const upload = require("../middleware/upload");
const promoController = require("../controllers/promoController");

router.post("/add", upload.single("thumnail"), promoController.addPromo);

router.get("/getall", promoController.showPromo);

router.get("/detail/:id", promoController.getDetail);

router.post(
  "/update-promo",
  upload.single("thumnail"),
  promoController.updatePromo
);

router.get("/delete/:id", promoController.deletePromo);

module.exports = router;
