const router = require("express").Router();
const CoffeeShopController = require("../controllers/coffeeShopController");

router.post("/", CoffeeShopController.addCoffeeShop);

router.get("/", CoffeeShopController.getCoffeeShop);

module.exports = router;
