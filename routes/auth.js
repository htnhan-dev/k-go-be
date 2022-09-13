const authController = require("../controllers/authController");

const router = require("express").Router();

// Dang ky
router.post("/register", authController.registerUser);
//Dang nhap
router.post("/login", authController.loginUser);
// Cap nhat ten nguoi dung
router.put("/update-name", authController.updateName);
//Get chi tiet 1 user
router.post("/detail-user", authController.getDetailUser);
//Cap nhat email
router.put("/update-email", authController.updateEmail);
//Cap nhat so dien thoai
router.put("/update-phone", authController.updatePhone);

module.exports = router;
