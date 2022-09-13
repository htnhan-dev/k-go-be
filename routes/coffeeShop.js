const router = require("express").Router();
const CoffeeShopController = require("../controllers/coffeeShopController");

const upload = require("../middleware/upload");

router.post("/add", upload.any(), CoffeeShopController.addCoffeeShop);

router.get("/getall", CoffeeShopController.getCoffeeShop);

module.exports = router;
