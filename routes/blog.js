const router = require("express").Router();
const blogController = require("../controllers/blogController");
const upload = require("../middleware/upload");

router.post("/add", upload.single("thumnail"), blogController.addBlog);

router.get("/getall", blogController.showBlog);

router.get("/detail/:id", blogController.getDetail);

router.get("/delete/:id", blogController.deleteBlog);

router.get("/blog-category/:idcategory", blogController.showbyCate);
module.exports = router;
