const router = require("express").Router();

const DistrictController = require("../controllers/districtController");
const upload = require("../middleware/upload");

router.post("/add", upload.single("thumnail"), DistrictController.addDictrict);

router.get("/getall", DistrictController.showDistrict);

router.get("/detail/:id", DistrictController.getDetail);

router.post(
  "/update-district",
  upload.single("thumnail"),
  DistrictController.updateDistrict
);

router.get("/delete/:id", DistrictController.deleteDistrict);

module.exports = router;
