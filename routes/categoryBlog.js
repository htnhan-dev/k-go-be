const router = require("express").Router();

const categoryBlogController = require("../controllers/categoryBlogController");

router.post("/add", categoryBlogController.addCategoryBlog);

router.get("/getall", categoryBlogController.showCategoryBlog);

router.post("/update-blog", categoryBlogController.updateCategory);

router.get("/delete/:id", categoryBlogController.deleteCategory);

module.exports = router;
