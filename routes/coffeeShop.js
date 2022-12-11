const router = require("express").Router();
const CoffeeShopController = require("../controllers/coffeeShopController");

const upload = require("../middleware/upload");

router.post("/add", upload.any(), CoffeeShopController.addCoffeeShop);

router.get("/getall", CoffeeShopController.getCoffeeShop);

router.get("/getapproval", CoffeeShopController.getApprovalCoffeeShop);

router.get("/detail", CoffeeShopController.getDetailCoffeeShop);

router.post("/approve", CoffeeShopController.approveCoffeeShop);

router.get("/delete/:id", CoffeeShopController.deleteCoffeeShop);

router.post("/district", CoffeeShopController.getByDistrict);

router.post("/category", CoffeeShopController.getByCategory);

router.post("/type", CoffeeShopController.getByType);

router.post("/uti", CoffeeShopController.getByUtilities);

router.post("/filter", CoffeeShopController.filterCoffeeShop);
module.exports = router;
