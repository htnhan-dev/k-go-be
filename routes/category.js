const router = require("express").Router();

const categoryController = require("../controllers/categoryController");
const upload = require("../middleware/upload");

router.post("/add", upload.single("thumnail"), categoryController.addCategory);

router.get("/getall", categoryController.showCategory);

router.get("/detail/:id", categoryController.getDetail);

router.post(
  "/update-category",
  upload.single("thumnail"),
  categoryController.updateCategory
);

router.get("/delete/:id", categoryController.deleteCategory);

module.exports = router;
