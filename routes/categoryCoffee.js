const router = require("express").Router();
const categoryCoffeeController = require("../controllers/categoryCoffeeController");

// Add Category Coffee Shop
router.post("/", categoryCoffeeController.addCategoryCoffee);

router.get("/", categoryCoffeeController.getCategoryCoffee);
module.exports = router;
